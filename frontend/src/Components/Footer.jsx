import Styles from'../Pages/Homepage/Style.jsx';

function Footer() {
  return (
    <footer className="py-12" style={{ background: "var(--soko-charcoal)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "var(--soko-amber)" }}>S</span>
            <span className="font-display text-xl font-black" style={{ color: "white" }}>
              Soko<span style={{ color: "var(--soko-amber)" }}>Tour</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} SokoTour. Made with ❤️ in Nairobi, Kenya.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;