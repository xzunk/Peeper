import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-white dark:bg-gray-800 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate dark:text-gray-400">
            © {new Date().getFullYear()} Peeper. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-slate hover:text-navy dark:text-gray-400 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-slate hover:text-navy dark:text-gray-400 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-slate hover:text-navy dark:text-gray-400 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;