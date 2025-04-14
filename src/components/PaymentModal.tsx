
import { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatToINR } from '@/lib/utils';

interface PaymentModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal = ({ amount, isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive"
      });
      return;
    }
    
    if (!cardName) {
      toast({
        title: "Missing information",
        description: "Please enter the cardholder name",
        variant: "destructive"
      });
      return;
    }
    
    if (expiryDate.length !== 5) {
      toast({
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date (MM/YY)",
        variant: "destructive"
      });
      return;
    }
    
    if (cvv.length !== 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid 3-digit CVV",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate success after showing checkmark
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  // Convert amount to INR
  const amountInINR = amount * 75; // Using the conversion rate from utils.ts

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Secure Payment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-6">Your order has been placed successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount
                  </label>
                  <span className="text-lg font-bold">{formatToINR(amount)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-techmart-purple rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="pl-10"
                      disabled={isProcessing}
                      required
                    />
                    <CreditCard size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                    Cardholder Name
                  </label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={isProcessing}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      maxLength={5}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      maxLength={3}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-techmart-purple hover:bg-techmart-purple-dark"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
