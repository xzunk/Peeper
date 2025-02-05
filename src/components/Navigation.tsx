import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calculator, FileText, Mail, Menu, X, PieChart, DollarSign, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-navy dark:text-white">
            Peeper
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <Calculator className="w-4 h-4 mr-1" />
              Stock Valuation
            </Link>
            <Link to="/profit" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <Calculator className="w-4 h-4 mr-1" />
              Profit Calculator
            </Link>
            <Link to="/portfolio" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <PieChart className="w-4 h-4 mr-1" />
              Portfolio Risk
            </Link>
            <Link to="/dividend" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <DollarSign className="w-4 h-4 mr-1" />
              Dividend Tracker
            </Link>
            <Link to="/terms" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <FileText className="w-4 h-4 mr-1" />
              Terms
            </Link>
            <Link to="/privacy" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <FileText className="w-4 h-4 mr-1" />
              Privacy
            </Link>
            <Link to="/contact" className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white">
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Link>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="ml-4"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-slate dark:text-white" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/" 
              className="flex items-center text-slate hover:text-navy dark:text-gray-300 dark:hover:text-white px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Stock Valuation
            </Link>
            <Link 
              to="/profit" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Profit Calculator
            </Link>
            <Link 
              to="/portfolio" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <PieChart className="w-4 h-4 mr-1" />
              Portfolio Risk
            </Link>
            <Link 
              to="/dividend" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Dividend Tracker
            </Link>
            <Link 
              to="/terms" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-4 h-4 mr-1" />
              Privacy
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center text-slate hover:text-navy px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail className="w-4 h-4 mr-1" />
              Contact
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex items-center justify-center gap-2"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
