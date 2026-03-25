
// ── Styles ────────────────────────────────────────────────────────────────────
function ProfileStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; background: #FDF6EC; }
      .font-display { font-family: 'Playfair Display', serif; }
      .blob { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }

      /* Input base */
      .soko-input {
        width: 100%; padding: 13px 16px;
        border-radius: 12px; border: 1.5px solid rgba(26,18,9,0.13);
        background: #FEFCF8; font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem; color: #1A1209; outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .soko-input:focus {
        border-color: #E8860A;
        box-shadow: 0 0 0 3px rgba(232,134,10,0.12);
      }
      .soko-input:disabled {
        background: rgba(26,18,9,0.03);
        color: rgba(26,18,9,0.4);
        cursor: not-allowed;
      }
      .soko-input::placeholder { color: rgba(26,18,9,0.3); }

      /* Toggle switch */
      .toggle-track {
        width: 48px; height: 26px; border-radius: 50px;
        cursor: pointer; position: relative;
        transition: background 0.3s ease;
        flex-shrink: 0;
      }
      .toggle-thumb {
        position: absolute; top: 3px; left: 3px;
        width: 20px; height: 20px; border-radius: 50%;
        background: white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        transition: transform 0.3s ease;
      }
      .toggle-track.on  { background: #E8860A; }
      .toggle-track.off { background: rgba(26,18,9,0.15); }
      .toggle-thumb.on  { transform: translateX(22px); }

      /* Save button shimmer */
      .btn-shimmer { position: relative; overflow: hidden; }
      .btn-shimmer::before {
        content: ''; position: absolute; top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
        transition: left 0.5s ease;
      }
      .btn-shimmer:hover::before { left: 160%; }

      /* Avatar upload hover */
      .avatar-wrap:hover .avatar-overlay { opacity: 1; }
      .avatar-overlay {
        opacity: 0; transition: opacity 0.25s ease;
        position: absolute; inset: 0; border-radius: 50%;
        background: rgba(26,18,9,0.5);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
      }

      /* Card */
      .profile-card {
        background: white; border-radius: 24px;
        border: 1px solid rgba(26,18,9,0.07);
        box-shadow: 0 4px 24px rgba(26,18,9,0.06);
        padding: 32px;
        margin-bottom: 20px;
      }

      /* Completeness bar */
      .progress-fill {
        height: 100%; border-radius: 50px;
        background: linear-gradient(90deg, #E8860A, #C4732A);
        transition: width 0.6s ease;
      }

      /* Field label */
      .field-label {
        display: block; font-size: 0.72rem; font-weight: 600;
        text-transform: uppercase; letter-spacing: 0.07em;
        color: rgba(26,18,9,0.45); margin-bottom: 6px;
      }

      /* Success toast */
      .toast {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        background: #1A1209; color: white; padding: 12px 24px;
        border-radius: 50px; font-size: 0.875rem; font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.25); z-index: 999;
        animation: toastIn 0.35s ease, toastOut 0.35s ease 2.3s both;
        white-space: nowrap;
      }
      @keyframes toastIn  { from { opacity:0; transform: translateX(-50%) translateY(16px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
      @keyframes toastOut { from { opacity:1; } to { opacity:0; } }

      /* Animations */
      @keyframes fadeUp  { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
      @keyframes spin    { to   { transform: rotate(360deg); } }
      .anim-fade-up { animation: fadeUp 0.5s ease both; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }

      /* Nav glass */
      .nav-glass {
        backdrop-filter: blur(12px);
        background: rgba(253,246,236,0.92);
        border-bottom: 1px solid rgba(232,134,10,0.12);
      }
    `}</style>
  );
}

export default  ProfileStyles ;