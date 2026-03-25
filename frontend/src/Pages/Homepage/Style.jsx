// Globalstyles --- inside or not inside tailwindcss

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --soko-amber: #E8860A;
      --soko-earth: #7C3B0F;
      --soko-sage: #3D6B4F;
      --soko-cream: #FDF6EC;
      --soko-charcoal: #1A1209;
    }

    * { box-sizing: border-box; }

    body {
      background-color: var(--soko-cream);
      font-family: 'DM Sans', sans-serif;
      color: var(--soko-charcoal);
      overflow-x: hidden;
    }

    .font-display { font-family: 'Playfair Display', serif; }

    /* ── Hero grain overlay ── */
    .grain::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 2;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { transform: translateX(-60px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes pulse-slow {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.04); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .anim-fade-up   { animation: fadeUp    0.8s ease both; }
    .anim-fade-in   { animation: fadeIn    1s   ease both; }
    .anim-slide-r   { animation: slideRight 0.8s ease both; }
    .anim-float     { animation: float     4s   ease-in-out infinite; }
    .anim-pulse     { animation: pulse-slow 3s  ease-in-out infinite; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }

    /* ── Marquee ── */
    .marquee-track {
      display: flex;
      gap: 0;
      animation: ticker 22s linear infinite;
      will-change: transform;
    }

    /* ── Card hover lift ── */
    .card-hover {
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .card-hover:hover {
      transform: translateY(-8px) rotate(-0.5deg);
      box-shadow: 0 24px 48px rgba(124,59,15,0.18);
    }

    /* ── Guide card inner hover ── */
    .guide-img {
      transition: transform 0.5s ease;
    }
    .card-hover:hover .guide-img {
      transform: scale(1.06);
    }

    /* ── CTA button shimmer ── */
    .btn-shimmer {
      position: relative;
      overflow: hidden;
    }
    .btn-shimmer::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
      transition: left 0.55s ease;
    }
    .btn-shimmer:hover::before { left: 160%; }

    /* ── Diagonal section divider ── */
    .diagonal-top {
      clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%);
    }
    .diagonal-bottom {
      clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
    }

    /* ── FAQ accordion ── */
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.3s ease;
    }
    .faq-answer.open {
      max-height: 300px;
    }

    /* ── Star rating ── */
    .star { color: var(--soko-amber); }

    /* ── Scroll progress bar ── */
    #progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: var(--soko-amber);
      z-index: 9999;
      transition: width 0.1s linear;
    }

    /* Nav glass */
    .nav-glass {
      backdrop-filter: blur(12px);
      background: rgba(253,246,236,0.88);
      border-bottom: 1px solid rgba(232,134,10,0.15);
    }

    /* Soft blob */
    .blob {
      border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
    }
  `}</style>
);

export default GlobalStyles;