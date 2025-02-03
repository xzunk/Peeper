const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Collection</h2>
        <p className="mb-4">We do not store any financial data entered into the calculator. All calculations are performed client-side.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Usage Analytics</h2>
        <p className="mb-4">We may use anonymous analytics to improve our service. No personal information is collected.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
        <p className="mb-4">This calculator does not integrate with any third-party services that collect user data.</p>
      </div>
    </div>
  );
};

export default Privacy;