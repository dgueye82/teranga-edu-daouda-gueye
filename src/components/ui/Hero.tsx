
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-teranga-background/80 to-teranga-background/60"></div>
        <img 
          src="/lovable-uploads/4e73e45e-0576-481c-9188-001a368a7ec4.png" 
          alt="Fond éducatif avec livre et arbre de connaissance" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-animate">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-teranga-blue">
            TERANGA EDU
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
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
