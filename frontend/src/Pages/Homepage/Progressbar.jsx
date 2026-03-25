// Renders a thin amber bar fixed at the very top of the viewport that grows as the user scrolls

import { useState, useEffect } from 'react';

function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div id="progress-bar" style={{ width: `${width}%` }} />;
}

export default ProgressBar;