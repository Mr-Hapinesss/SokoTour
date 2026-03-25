
import GlobalStyles from "./Style.jsx";
import Hero from "./Hero.jsx";
import Marquee from "./Marquee.jsx";
import Stats from "./Stats.jsx";
import HowItWorks from "./HowItWorks.jsx";
import Markets from "./Markets.jsx";
import Reviews from "./Reviews.jsx";
import FAQ from "./FAQ.jsx";
import SignupCTA from "./SignUpTCA.jsx";
import ProgressBar from "./Progressbar.jsx";



function Defaultpage() {
  return (
    <>
      <GlobalStyles />
      <ProgressBar />
      <Hero />
      <Marquee />
      <Stats />
      <HowItWorks />
      <Markets />
      <Reviews />
      <FAQ />
      <SignupCTA />
    </>
  );
}

export default Defaultpage;