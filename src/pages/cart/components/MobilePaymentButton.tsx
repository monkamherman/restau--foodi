
import { useState } from 'react';
import { Smartphone } from 'lucide-react';

const MobilePaymentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handlePaymentClick}
        className="w-full text-center py-3 border border-foodie-primary text-foodie-primary font-medium rounded-lg hover:bg-foodie-primary-light transition-colors flex items-center justify-center"
      >
        <Smartphone size={18} className="mr-2" />
        Mobile Payment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Mobile Payment</h3>
            <p className="text-foodie-text-light mb-6">
              Scan the QR code with your mobile payment app to complete your purchase.
            </p>
            
            <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center mb-6">
              <div className="w-48 h-48 bg-white p-3">
                {/* Placeholder for QR code */}
                <div className="w-full h-full border-2 border-foodie-primary flex items-center justify-center">
                  <span className="text-sm text-center text-foodie-text-light">QR Code Placeholder</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePaymentButton;
