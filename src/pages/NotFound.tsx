import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">About</h3>
            <p className="text-sm text-gray-600">
              Peeper is A comprehensive stock valuation tool for the Global Stock markets, (Find PBV/NAV/PE) helping investors make informed decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on financial data. Always conduct thorough research before making investment decisions.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-navy mb-2">Contact</h3>
            <p className="text-sm text-gray-600">
              For support or inquiries, please visit our contact page or email cs@cosmo.com.lk
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Peeper| Backed by CosmoETSP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;