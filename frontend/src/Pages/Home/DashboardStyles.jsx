export default function DashboardStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      .font-display { font-family: 'Playfair Display', serif; }

      .blob { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }

      /* Card hover lift */
      .card-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
      }
      .card-lift:hover {
        transform: translateY(-6px) rotate(-0.4deg);
        box-shadow: 0 20px 40px rgba(124,59,15,0.15);
      }

      /* Shimmer button */
      .btn-shimmer { position: relative; overflow: hidden; }
      .btn-shimmer::before {
        content: '';
        position: absolute; top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
        transition: left 0.5s ease;
      }
      .btn-shimmer:hover::before { left: 160%; }

      /* Modal overlay */
      .modal-overlay {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(26,18,9,0.65);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        padding: 16px;
        animation: fadeIn 0.2s ease;
      }

      /* Booking option card */
      .option-card {
        border-radius: 14px; padding: 14px 16px;
        border: 2px solid rgba(26,18,9,0.1);
        cursor: pointer; transition: all 0.2s ease;
        background: white;
        display: flex; align-items: center; gap: 12px;
      }
      .option-card:hover  { border-color: #E8860A; background: #fffaf3; }
      .option-card.active {
        border-color: #E8860A; background: #fff7e6;
        box-shadow: 0 0 0 3px rgba(232,134,10,0.12);
      }

      /* Tab button */
      .tab-btn {
        padding: 8px 20px; border-radius: 50px;
        font-weight: 600; font-size: 0.85rem;
        border: none; cursor: pointer;
        transition: all 0.25s ease;
        font-family: 'DM Sans', sans-serif;
      }

      /* Pulse ring on CTA */
      @keyframes pulseRing {
        0%   { transform: scale(1);    opacity: 0.6; }
        100% { transform: scale(1.55); opacity: 0; }
      }
      .pulse-ring {
        position: absolute; inset: 0; border-radius: 50px;
        background: #E8860A;
        animation: pulseRing 1.8s ease-out infinite;
      }

      /* Animations */
      @keyframes fadeIn  { from { opacity: 0; }                       to { opacity: 1; } }
      @keyframes fadeUp  { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes spin    { to { transform: rotate(360deg); } }
      @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }

      .anim-fade-up  { animation: fadeUp   0.6s ease both; }
      .anim-slide-in { animation: slideIn  0.5s ease both; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }

      /* Hide scrollbar on guide row */
      .no-scroll::-webkit-scrollbar { display: none; }
      .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );
}
