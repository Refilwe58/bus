import React, { useState,useEffect  } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import {
  getUserPaymentMethods,
  addUserPaymentMethod,
  topUpUserBalance,checkTopUpStatus 
} from '../api';
import { CreditCardIcon, CheckCircleIcon, ChevronRightIcon, InfoIcon, Lock as LockIcon } from 'lucide-react';
import {loadStripe} from '@stripe/stripe-js';

interface TopUpProps {
  onNavigate: (page: string) => void;
}
export const TopUp: React.FC<TopUpProps> = ({
  onNavigate
}) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState(1);
 const [succ, setSucc] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [lastTopUp, setLastTopUp] = useState<{ amount: number; date: string } | null>(null);
  
   // Initialize balance from localStorage user data
  const [balance, setBalance] = useState<number>(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        return userData.balance ?? 0;
      } catch {
        return 0;
      }
    }
    return 0;
  });
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const rawSessionId = params.get('session_id');
  const succ = params.get('success');       // string or null
  const stepParam = parseInt(params.get('step') || '0', 10);

  // Clean sessionId from curly braces if any
  const sessionId = rawSessionId?.replace(/[{}]/g, '');

  // Exit early if no sessionId or success param is not "true"
  if (!sessionId || succ !== 'true') return;

  // Only proceed if step is 4 (payment success page)
  if (stepParam !== 4) return;

  // Immediately update UI to step 4 to show success screen
  setStep(4);

  async function checkPaymentStatus(sessionId: string) {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const userData = JSON.parse(userStr);

    try {
      console.log("Checking payment status with sessionId:", sessionId);
      ///updating balance with api
      const response = await checkTopUpStatus(userData.id, sessionId);
      if (response.data.success) {
        console.log("Payment success response:", response.data);
        setBalance(response.data.balance);
        setLastTopUp(response.data.lastTopUp);

        const updatedUser = {
          ...userData,
          balance: response.data.balance,
          lastTopUp: response.data.lastTopUp,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Clean URL to remove query params after handling success
        window.history.replaceState(null, '', window.location.pathname);
      } else {
        alert(response.data.message || 'Payment not completed yet.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }

  checkPaymentStatus(sessionId);
}, []);










 // Handle the Continue button click depending on the current step
 const handleContinue = async () => {
  const stripe = await loadStripe("pk_test_51RnaNqR8PrV7er4pX1ucgZUqcZsu3yCTPHbFQG2W3s9H0waC1I49pbkMu8X9yJBAXq3xzOa4eMjNgbFuFA14DYh300nhgA1np3");
 if (step === 1 && amount) {
    setStep(2);
  } else if (step === 2 && paymentMethod) {
    setStep(3);
  } else if (step === 3) {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('User not logged in.');
        return;
      }

      const userData = JSON.parse(userStr);
      // Create checkout session, get sessionId using the api
      const response = await topUpUserBalance(userData.id, parseFloat(amount));
      const { sessionId, success } = response.data;

      if (success) {
        console.log("stripe id ",response.data)
        // Redirect to Stripe Checkout page
        await stripe.redirectToCheckout({ sessionId });
       setSucc(true);

       
        // Do NOT set step here, user will come back with session_id in URL
      } else {
        alert('Top-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Top-up error:', error);
      alert('Top-up failed due to an error.');
    }
  } else if (step === 4 && succ) {
    onNavigate('dashboard');
  }
};


 return (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Top Up Your Card</h1>
        <p className="text-gray-600">
          Add value to your bus card quickly and securely
        </p>
      </div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            4
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Amount</span>
          <span>Payment</span>
          <span>Confirm</span>
          <span>Receipt</span>
        </div>
      </div>
      <Card>
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Top-Up Amount</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {['50', '100', '150', '200', '300', '500'].map(value => (
                <button
                  key={value}
                  className={`p-4 border rounded-md text-center ${
                    amount === value ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'
                  }`}
                  onClick={() => setAmount(value)}
                >
                  <span className="block font-medium">R {value}</span>
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min="1"
                />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-start">
              <InfoIcon size={20} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Your current balance is R {balance.toFixed(2)}. The maximum card balance allowed is R 1,000.
              </p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
            <div className="space-y-3 mb-6">
              <button
                className={`w-full p-4 border rounded-md flex justify-between items-center ${
                  paymentMethod === 'creditcard' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'
                }`}
                onClick={() => setPaymentMethod('creditcard')}
              >
                <div className="flex items-center">
                  <CreditCardIcon size={20} className="mr-3 text-gray-600" />
                  <div>
                    <span className="block font-medium">Credit/Debit Card</span>
                    <span className="text-xs text-gray-500">Visa, Mastercard, American Express</span>
                  </div>
                </div>
                <ChevronRightIcon size={20} className="text-gray-400" />
              </button>
              {/* <button
                className={`w-full p-4 border rounded-md flex justify-between items-center ${
                  paymentMethod === 'eft' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'
                }`}
                onClick={() => setPaymentMethod('eft')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    E
                  </div>
                  <div>
                    <span className="block font-medium">EFT Payment</span>
                    <span className="text-xs text-gray-500">Direct bank transfer</span>
                  </div>
                </div>
                <ChevronRightIcon size={20} className="text-gray-400" />
              </button> */}
              {/* <button
                className={`w-full p-4 border rounded-md flex justify-between items-center ${
                  paymentMethod === 'voucher' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-600 hover:bg-teal-50'
                }`}
                onClick={() => setPaymentMethod('voucher')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    V
                  </div>
                  <div>
                    <span className="block font-medium">Voucher Code</span>
                    <span className="text-xs text-gray-500">Redeem a prepaid voucher</span>
                  </div>
                </div>
                <ChevronRightIcon size={20} className="text-gray-400" />
              </button> */}
            </div>

            {/* Credit Card Details if selected */}
           {paymentMethod === 'creditcard' && <div className="mt-6 pt-6 border-t">
                  {/* <div className="flex items-center mb-4">
                    <LockIcon size={16} className="text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Secure payment powered by Stripe
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input type="text" value={cardDetails.cardNumber} onChange={e => setCardDetails({
                    ...cardDetails,
                    cardNumber: e.target.value
                  })} placeholder="1234 5678 9012 3456" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <div className="w-6 h-4 bg-blue-600 rounded"></div>
                          <div className="w-6 h-4 bg-red-500 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input type="text" value={cardDetails.expiry} onChange={e => setCardDetails({
                    ...cardDetails,
                    expiry: e.target.value
                  })} placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input type="text" value={cardDetails.cvc} onChange={e => setCardDetails({
                    ...cardDetails,
                    cvc: e.target.value
                  })} placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input type="text" value={cardDetails.name} onChange={e => setCardDetails({
                  ...cardDetails,
                  name: e.target.value
                })} placeholder="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                    </div>
                    <div className="flex items-center">
                      <input id="save-card" type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                      <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                        Save this card for future payments
                      </label>
                    </div>
                  </div> */}
                </div>}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm Top-Up</h2>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Top-Up Amount:</span>
                <span className="font-medium">R {amount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === 'creditcard' && (
                    <div className="flex items-center">
                      <CreditCardIcon size={16} className="mr-1 text-gray-600" />
                      <span>Card ending in {cardDetails.cardNumber.slice(-4) || '****'}</span>
                    </div>
                  )}
                  {paymentMethod === 'eft' && 'EFT Payment'}
                  {paymentMethod === 'voucher' && 'Voucher Code'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Processing Fee:</span>
                <span className="font-medium">R 0.00</span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total Amount:</span>
                <span>R {amount}</span>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <p className="text-sm text-yellow-800">
                By proceeding, you agree to the terms and conditions for online top-ups. The amount will be added to your card immediately after payment is confirmed.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-md mb-6 flex items-start">
              <LockIcon size={20} className="text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                Your payment is secure. We use Stripe's secure payment processing to protect your information.
              </p>
            </div>
          </div>
        )}
        {step === 4 && (
        <div className="text-center">
          <div className="mb-4">
            <CheckCircleIcon size={48} className="text-green-600" />
          </div>
          <h2>Top-Up Successful!</h2>
          <p>R {lastTopUp?.amount ?? amount} has been added successfully.</p>

          <div className="receipt p-4 border rounded max-w-xs mx-auto my-4">
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span>{lastTopUp?.sessionId || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span>{lastTopUp ? new Date(lastTopUp.date).toLocaleString() : new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Previous Balance:</span>
              <span>R {(balance - (lastTopUp?.amount ?? parseFloat(amount))).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>New Balance:</span>
              <span>R {balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-x-4">
            <button className="text-teal-600 hover:text-teal-800">Email Receipt</button>
            <button className="text-teal-600 hover:text-teal-800">Download PDF</button>
          </div>

          <div className="mt-6">
            <Button onClick={() => onNavigate("dashboard")}>Back to Dashboard</Button>
          </div>
        </div>
      )}
        <div className="mt-6 flex justify-between">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < 4 && (
            <Button
              variant="primary"
              className={step === 1 ? 'ml-auto' : ''}
              onClick={handleContinue}
              disabled={(step === 1 && !amount) || (step === 2 && !paymentMethod)}
            >
              Continue
            </Button>
          )}

        </div>
      </Card>
    </div>
  </div>
);

};