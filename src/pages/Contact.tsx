const Contact = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="prose prose-slate max-w-none">
          <p className="mb-6">Have questions about using our Stock Valuation Calculator? We're here to help.</p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">Email: cs@cosmo.com.lk</p>
            <p className="mb-4">Response Time: Within 24-48 hours</p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM (Sri Lanka Time)</p>
            </div>
          </div>
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

export default Contact;