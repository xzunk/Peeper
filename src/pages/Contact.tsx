const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-6">Have questions about using our Stock Valuation Calculator? We're here to help.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">Email:cs@cosmo.com.lk </p>
          <p className="mb-4">Response Time: Within 24-48 hours</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM (Sri Lanka Time)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
