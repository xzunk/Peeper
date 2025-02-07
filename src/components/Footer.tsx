import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="w-full mb-12">
        <script type="text/javascript">
          {`
          atOptions = {
            'key' : '0dcace2a1f2e63fb35bc83b83502a76c',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
          `}
        </script>
        <script 
          type="text/javascript" 
          src="//www.highperformanceformat.com/0dcace2a1f2e63fb35bc83b83502a76c/invoke.js"
        />
      </div>
      <footer className="w-full py-6 bg-line-black border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/terms" className="text-sm text-white hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-white hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-sm text-white hover:text-gray-300 transition-colors">
                Contact
              </Link>
              <a 
                href="https://www.tradingview.com/markets/sri-lanka/#market-summary" 
                target="_blank" 
                rel="follow" 
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Market Summary
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;