
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobilePaymentProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const MobilePayment = ({ amount, onClose, onSuccess }: MobilePaymentProps) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false);
      
      if (code === "123456") {
        setStep(3);
        // Simulate payment processing
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError("Invalid code. For demo, use 123456");
      }
    }, 1500);
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
        
        <h2 className="text-2xl font-bold mb-6">Mobile Payment</h2>
        
        {step === 1 && (
          <form onSubmit={handleSubmitPhone}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Enter your phone number
              </label>
              <Input
                type="tel"
                placeholder="+1 (234) 567-8900"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-sm text-foodie-text-light mt-2">
                We'll send you a verification code
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="font-bold">
                Total: ${amount.toFixed(2)}
              </div>
              <Button 
                type="submit" 
                disabled={!phoneNumber || isLoading}
                className="bg-foodie-primary hover:bg-foodie-primary-dark"
              >
                {isLoading ? "Sending..." : "Send Code"}
              </Button>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Enter verification code
              </label>
              <Input
                type="text"
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                className="w-full"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
              <p className="text-sm text-foodie-text-light mt-2">
                We sent a code to {phoneNumber}
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-foodie-primary hover:underline text-sm"
              >
                Change phone number
              </button>
              <Button 
                type="submit" 
                disabled={code.length !== 6 || isLoading}
                className="bg-foodie-primary hover:bg-foodie-primary-dark"
              >
                {isLoading ? "Verifying..." : "Verify & Pay"}
              </Button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-medium mb-2">Processing Payment</h3>
            <p className="text-foodie-text-light mb-2">
              Please don't close this window...
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-foodie-primary rounded-full"></div>
                <div className="h-3 w-3 bg-foodie-primary rounded-full"></div>
                <div className="h-3 w-3 bg-foodie-primary rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePayment;
