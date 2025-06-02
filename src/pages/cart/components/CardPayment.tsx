
import { useState } from "react";
import { X, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentMethod } from "../types/paymentTypes";

interface CardPaymentProps {
  amount: number;
  method: 'mastercard' | 'visa';
  onClose: () => void;
  onSuccess: () => void;
}

const CardPayment = ({ amount, method, onClose, onSuccess }: CardPaymentProps) => {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const cardConfig = {
    mastercard: {
      name: 'Mastercard',
      color: 'bg-red-500',
      pattern: /^5[1-5]/
    },
    visa: {
      name: 'Visa',
      color: 'bg-blue-500',
      pattern: /^4/
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    
    // Vérifier le pattern selon le type de carte
    if (!cardConfig[method].pattern.test(cardNumber)) {
      setError(`Ce numéro de carte ne correspond pas à ${cardConfig[method].name}`);
      return false;
    }
    
    // Vérifier la longueur
    if (cardNumber.length !== 16) {
      setError("Le numéro de carte doit contenir 16 chiffres");
      return false;
    }
    
    // Vérifier la date d'expiration
    const [month, year] = cardData.expiryDate.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    
    if (expiryDate < currentDate) {
      setError("La carte a expiré");
      return false;
    }
    
    // Vérifier le CVV
    if (cardData.cvv.length !== 3) {
      setError("Le CVV doit contenir 3 chiffres");
      return false;
    }
    
    return true;
  };

  const handleSubmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!validateCard()) return;
    
    setIsLoading(true);
    
    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center mb-6">
          <div className={`w-8 h-8 ${cardConfig[method].color} rounded-full flex items-center justify-center text-white mr-3`}>
            💳
          </div>
          <h2 className="text-2xl font-bold">{cardConfig[method].name}</h2>
        </div>
        
        {step === 1 && (
          <form onSubmit={handleSubmitCard}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom du porteur
                </label>
                <Input
                  type="text"
                  placeholder="Nom complet"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Numéro de carte
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData({...cardData, cardNumber: formatCardNumber(e.target.value)})}
                  maxLength={19}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date d'expiration
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/AA"
                    value={cardData.expiryDate}
                    onChange={(e) => setCardData({...cardData, expiryDate: formatExpiryDate(e.target.value)})}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CVV
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            
            <div className="flex justify-between items-center">
              <div className="font-bold">
                Montant: {amount.toFixed(2)} FCFA
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className={cardConfig[method].color}
              >
                {isLoading ? "Traitement..." : "Payer"}
              </Button>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-medium mb-2">Paiement en cours</h3>
            <p className="text-foodie-text-light mb-2">
              Traitement du paiement par carte...
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className={`h-3 w-3 ${cardConfig[method].color.replace('bg-', 'bg-')} rounded-full`}></div>
                <div className={`h-3 w-3 ${cardConfig[method].color.replace('bg-', 'bg-')} rounded-full`}></div>
                <div className={`h-3 w-3 ${cardConfig[method].color.replace('bg-', 'bg-')} rounded-full`}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPayment;
