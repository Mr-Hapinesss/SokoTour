import React, { useEffect, useState } from 'react';
import { userContext } from './userContext.jsx';
import {Link} from 'react-router-dom';
import Style from '../Pages/Homepage/Style.jsx';


function Header() {
  const { userInfo, setUserInfo } = React.useContext(userContext);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect( ()=> {   // Fetch user profile on component mount
        fetch('http://localhost:3000/user/profile', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        })
        .then(response => {
            if (!response.ok) throw new Error('Not logged in');
            return response.json();
            })
        .then(data => {
            console.log("Fetched user info:", data);
           setUserInfo(data);
           setLoggedIn(true);
           console.log("User info set to:", data);
        })
        }, []);

        console.log("Current user info:", userInfo);



  async function logout() {   // Logout function
    await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            setUserInfo(null); // Clear user info on logout
            window.location.href = "/default"; // Redirect to homepage
            setLoggedIn(false);
        }
    })
    .catch(error => {
        console.error("Logout error:", error);
    });
  }

  const username = userInfo?.info?.username;

  let logo = loggedIn ? "/main" : "/default";


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-sm py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to={logo} className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "var(--soko-amber)" }}
          >
            S
          </span>
          <span
            className="font-display text-xl font-black tracking-tight"
            style={{ color: "var(--soko-earth)" }}
          >
            Soko<span style={{ color: "var(--soko-amber)" }}>Tour</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: "var(--soko-charcoal)" }}
        >
          {username ? (
            // Logged-in links
            <>
              <Link
                to="/main"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                My Profile
              </Link>
            </>
          ) : (
            // Logged-out links
            <>
              {["Markets", "How It Works", "Reviews", "FAQ"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  className="hover:opacity-60 transition-opacity duration-200"
                  style= {{ color: "var(--soko-amber)" }}
                >
                  {l}
                </a>
              ))}
            </>
          )}
        </div>

        {/* ── Desktop CTA / Auth buttons ── */}
        <div className="hidden md:flex items-center gap-3">
          {username ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="btn-shimmer px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "#b91c1c" }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-gray-100"
                style={{
                  color: "var(--soko-amber)",
                  borderColor: "rgba(26,18,9,0.2)",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-shimmer px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: "var(--soko-amber)" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
            style={{ background: "var(--soko-charcoal)" }}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
            style={{ background: "var(--soko-charcoal)" }}
          />
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
            style={{ background: "var(--soko-charcoal)" }}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3 text-sm font-medium nav-glass">
          {username ? (
            <>
              <Link
                to="/main"
                onClick={() => setMenuOpen(false)}
                style={{ color: "var(--soko-charcoal)" }}
              >
                Home
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                style={{ color: "var(--soko-charcoal)" }}
              >
                My Profile
              </Link>
              <button
                onClick={() => { setMenuOpen(false); setShowConfirm(true); }}
                className="text-left text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {["Markets", "How It Works", "Reviews", "FAQ"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--soko-charcoal)" }}
                >
                  {l}
                </a>
              ))}
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                style={{ color: "var(--soko-charcoal)" }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-shimmer inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white w-fit"
                style={{ background: "var(--soko-amber)" }}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      {/* ── Logout confirmation modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div
            className="rounded-2xl p-8 shadow-2xl w-80"
            style={{ background: "var(--soko-cream)" }}
          >
            <p
              className="font-display text-lg font-bold mb-2"
              style={{ color: "var(--soko-charcoal)" }}
            >
              Leaving so soon?
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(26,18,9,0.6)" }}
            >
              Are you sure you want to log out of SokoTour?
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#b91c1c" }}
                onClick={() => { logout(); setShowConfirm(false); }}
              >
                Yes, logout
              </button>
              <button
                className="flex-1 py-2.5 rounded-full text-sm font-semibold border transition-all hover:bg-gray-100"
                style={{
                  color: "var(--soko-charcoal)",
                  borderColor: "rgba(26,18,9,0.2)",
                }}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


export default Header;