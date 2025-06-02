
import { useState } from "react";
import { X } from "lucide-react";
import { PaymentMethod, PAYMENT_PROVIDERS } from "../types/paymentTypes";
import OrangeMoneyPayment from "./OrangeMoneyPayment";
import MTNMobilePayment from "./MTNMobilePayment";
import CardPayment from "./CardPayment";

interface PaymentMethodSelectorProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentMethodSelector = ({ amount, onClose, onSuccess }: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleBack = () => {
    setSelectedMethod(null);
  };

  // Rendu des composants de paiement spécifiques
  if (selectedMethod === 'orange-money') {
    return <OrangeMoneyPayment amount={amount} onClose={onClose} onSuccess={onSuccess} />;
  }
  
  if (selectedMethod === 'mtn-mobile') {
    return <MTNMobilePayment amount={amount} onClose={onClose} onSuccess={onSuccess} />;
  }
  
  if (selectedMethod === 'mastercard' || selectedMethod === 'visa') {
    return <CardPayment amount={amount} method={selectedMethod} onClose={onClose} onSuccess={onSuccess} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Choisir un mode de paiement</h2>
        <p className="text-foodie-text-light mb-6">
          Montant à payer: <span className="font-bold">{amount.toFixed(2)} FCFA</span>
        </p>
        
        <div className="space-y-3">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Paiement Mobile</h3>
            <div className="space-y-2">
              {(['orange-money', 'mtn-mobile'] as PaymentMethod[]).map((method) => {
                const provider = PAYMENT_PROVIDERS[method];
                return (
                  <button
                    key={method}
                    onClick={() => handleMethodSelect(method)}
                    className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className={`w-10 h-10 ${provider.color} rounded-full flex items-center justify-center text-white mr-4`}>
                      {provider.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-foodie-text-light">{provider.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Paiement par Carte</h3>
            <div className="space-y-2">
              {(['mastercard', 'visa'] as PaymentMethod[]).map((method) => {
                const provider = PAYMENT_PROVIDERS[method];
                return (
                  <button
                    key={method}
                    onClick={() => handleMethodSelect(method)}
                    className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <div className={`w-10 h-10 ${provider.color} rounded-full flex items-center justify-center text-white mr-4`}>
                      {provider.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-foodie-text-light">{provider.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
