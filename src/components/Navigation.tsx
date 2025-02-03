import { Link } from "react-router-dom";
import { FileText, Mail, Menu } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-navy">
            Stock Calculator
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/terms" className="flex items-center text-slate hover:text-navy">
              <FileText className="w-4 h-4 mr-1" />
              Terms
            </Link>
            <Link to="/privacy" className="flex items-center text-slate hover:text-navy">
              <FileText className="w-4 h-4 mr-1" />
              Privacy
            </Link>
            <Link to="/contact" className="flex items-center text-slate hover:text-navy">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Link>
          </div>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;