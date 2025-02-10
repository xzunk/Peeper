import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, FileText, Mail, Menu, X, PieChart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-line-black shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-white">
            Peeper
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <Calculator className="w-4 h-4 mr-1" />
              Stock Valuation
            </Link>
            <Link to="/profit" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <Calculator className="w-4 h-4 mr-1" />
              Profit Calculator
            </Link>
            <Link to="/portfolio" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <PieChart className="w-4 h-4 mr-1" />
              Portfolio Risk
            </Link>
            <Link to="/dividend" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <DollarSign className="w-4 h-4 mr-1" />
              Dividend Tracker
            </Link>
            
          </div>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-white hover:text-gray-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Stock Valuation
            </Link>
            <Link 
              to="/profit" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Profit Calculator
            </Link>
            <Link 
              to="/portfolio" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <PieChart className="w-4 h-4 mr-1" />
              Portfolio Risk
            </Link>
            <Link 
              to="/dividend" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Dividend Tracker
            </Link>
            <Link 
              to="/terms" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Privacy
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center text-white hover:text-gray-300 transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
