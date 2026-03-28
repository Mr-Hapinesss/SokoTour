/**
 * Props:
 *  - toast : "saved" | "error" | null
 */
export default function ProfileToast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className="toast"
      style={ toast === "error" ? { background: "#b91c1c" } : {} }
    >
      {toast === "saved" && "✓ Profile saved successfully!"}
      {toast === "error" && "✕ Something went wrong. Please try again."}
    </div>
  );
}
