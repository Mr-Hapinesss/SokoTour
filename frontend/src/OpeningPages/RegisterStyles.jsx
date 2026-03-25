
function RegisterStyles() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --soko-amber: #E8860A;
          --soko-earth: #7C3B0F;
          --soko-sage:  #3D6B4F;
          --soko-cream: #FDF6EC;
          --soko-charcoal: #1A1209;
        }

        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }

        .signup-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #1A1209 0%, #3D1A07 50%, #7C3B0F 100%);
          position: relative;
          overflow: hidden;
        }

        .signup-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            #E8860A 0, #E8860A 1px,
            transparent 0, transparent 50%
          );
          background-size: 30px 30px;
          opacity: 0.04;
        }

        .blob {
          border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
          position: absolute;
          pointer-events: none;
        }

        .signup-card {
          background: #FDF6EC;
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35);
          width: 100%;
          max-width: 420px;
          padding: 40px 36px;
          position: relative;
          z-index: 10;
        }

        .soko-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1.5px solid rgba(26,18,9,0.15);
          background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #1A1209;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          margin-bottom: 12px;
          display: block;
        }
        .soko-input::placeholder { color: rgba(26,18,9,0.35); }
        .soko-input:focus {
          border-color: #E8860A;
          box-shadow: 0 0 0 3px rgba(232,134,10,0.12);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          border-radius: 50px;
          background: #E8860A;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease;
          margin-top: 4px;
        }
        .btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(253,246,236,0.65);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          z-index: 10;
          margin-bottom: 24px;
        }
        .btn-back:hover { color: #FDF6EC; }

        .error-box {
          background: rgba(185,28,28,0.08);
          border: 1px solid rgba(185,28,28,0.25);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.8rem;
          color: #b91c1c;
          margin-bottom: 16px;
        }

        .divider {
          height: 1px;
          background: rgba(26,18,9,0.08);
          margin: 20px 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeUp 0.6s ease both;
        }
    `}</style>
    </>
  );

}

export default RegisterStyles;