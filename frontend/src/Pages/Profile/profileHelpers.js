// Returns two-letter initials from fullName, falls back to first letter of username
export function getInitials(fullName, username) {
  if (fullName) return fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return username?.[0]?.toUpperCase() ?? "U";
}

// Returns a 0-100 percentage based on how many of the 4 key fields are filled
export function completeness(form) {
  const fields = [form.fullName, form.phone, form.email, form.photoPreview];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// Validates form fields, returns an errors object (empty = valid)
export function validate(form) {
  const e = {};

  if (!form.fullName.trim())
    e.fullName = "Full name is required.";
  else if (form.fullName.trim().length < 3)
    e.fullName = "Name must be at least 3 characters.";

  if (!form.phone.trim())
    e.phone = "Phone number is required.";
  else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone))
    e.phone = "Enter a valid phone number.";

  if (!form.email.trim())
    e.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email address.";

  return e;
}
