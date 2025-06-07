
import { useState } from "react";
import { X, Smartphone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MTNMobilePaymentProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const MTNMobilePayment = ({ amount, onClose, onSuccess }: MTNMobilePaymentProps) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Valider le numéro MTN (commence par 67, 68, 650-659)
    const isValidMTN = phoneNumber.startsWith("67") || 
                       phoneNumber.startsWith("68") || 
                       (phoneNumber.startsWith("65") && phoneNumber.length === 9);
    
    if (!isValidMTN || phoneNumber.length !== 9) {
      setError("Numéro MTN invalide. Format: 67XXXXXXX, 68XXXXXXX ou 65XXXXXXX");
      setIsLoading(false);
      return;
    }
    
    // Simuler l'envoi de la demande de paiement
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
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
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3">
            <img src="/mtn.png" alt="mtn mobile money" />
          </div>
          <h2 className="text-2xl font-bold">MTN Mobile Money</h2>
        </div>
        
        {step === 1 && (
          <form onSubmit={handleSubmitPhone}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Numéro MTN Mobile Money
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +237
                </span>
                <Input
                  type="tel"
                  placeholder="67XXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  maxLength={9}
                  className="rounded-l-none"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <p className="text-sm text-foodie-text-light mt-2">
                Entrez votre numéro MTN Mobile Money
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="font-bold">
                Montant: {amount.toFixed(2)} FCFA
              </div>
              <Button 
                type="submit" 
                disabled={!phoneNumber || isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isLoading ? "Envoi..." : "Payer"}
              </Button>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <div className="text-center py-4">
            <Smartphone className="mx-auto mb-4 text-yellow-500" size={48} />
            <h3 className="text-xl font-medium mb-2">Confirmation requise</h3>
            <p className="text-foodie-text-light mb-4">
              Composez *126# sur votre téléphone MTN ({phoneNumber}) et confirmez le paiement de {amount.toFixed(2)} FCFA
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
              >
                Retour
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isLoading ? "Vérification..." : "J'ai confirmé"}
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-medium mb-2">Paiement en cours</h3>
            <p className="text-foodie-text-light mb-2">
              Traitement du paiement MTN Mobile Money...
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MTNMobilePayment;
