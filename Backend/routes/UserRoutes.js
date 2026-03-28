const express = require('express');
const User = require ('../Models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ── Auth middleware (JWT cookie based) ────────────────────────────────────────
// Reads the token from the httpOnly cookie, verifies it, and attaches the
// decoded user payload to req.user so routes can access req.user.id
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ── Register User ─────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, 
            password: bcrypt.hashSync(password, 10)}); //Hashing the password
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {        
        res.status(500).send(error);
        console.error(error);
    }
});

// ── Login User ────────────────────────────────────────────────────────────────
router.post('/login',async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(400).send('Invalid username or password');
        }

        try {
            const token = jwt.sign(
                { id: user._id.toString(), username: user.username }, 
                process.env.JWT_SECRET, 
                { expiresIn: '24h' }
            );

            res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
            res.json({ id: user._id, username: user.username });
        } catch (err) {
           res.status(500).json('Token generation failed');
        }
    } catch (error) {
        res.status(500).send('Error logging in user');
    }}
);

// ── GET /user/profile ─────────────────────────────────────────────────────────
// Fetches the full user document from the DB using the ID from the JWT.
// Returns all profile fields needed by ProfilePage and MainPage.
router.get('/profile', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// ── PATCH /user/profile ───────────────────────────────────────────────────────
// Updates fullName, phone, email, promoEmails, profilePhoto.
// Called by ProfilePage.jsx when the user clicks "Save Changes".
router.patch('/profile', requireAuth, async (req, res) => {
  const { fullName, phone, email, promoEmails, profilePhoto } = req.body;

  if (fullName !== undefined && fullName.trim().length < 3) {
    return res.status(400).json({ error: 'Full name must be at least 3 characters.' });
  }
  if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (phone !== undefined && !/^\+?[\d\s\-]{7,15}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  try {
    const updates = {};
    if (fullName     !== undefined) updates.fullName     = fullName.trim();
    if (phone        !== undefined) updates.phone        = phone.trim();
    if (email        !== undefined) updates.email        = email.trim();
    if (promoEmails  !== undefined) updates.promoEmails  = promoEmails;
    if (profilePhoto !== undefined) updates.profilePhoto = profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,              // ← JWT, not session
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error('PATCH /user/profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE /user/profile ──────────────────────────────────────────────────────
// Permanently deletes the account and clears the JWT cookie.
// Triggered by the "Delete my account" button in ProfilePage.jsx.
router.delete('/profile', requireAuth, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.user.id); // ← JWT, not session
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.clearCookie('token', { path: '/' });
    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    console.error('DELETE /user/profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Logout User ───────────────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' }).send('User logged out successfully');
});


module.exports = router;