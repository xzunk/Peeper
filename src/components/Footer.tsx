import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-white">
            © {new Date().getFullYear()} Peeper. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-white hover:text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-white hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-white hover:text-secondary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;