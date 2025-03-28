
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#87CEEB]">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-animate">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            TERANGA EDU
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Une solution complète de gestion numérique pour moderniser et optimiser
            l'administration des écoles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/how-it-works" className="btn-primary">
              <span className="flex items-center">
                Comment ça marche
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
            <Link to="/about" className="btn-outline">
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
