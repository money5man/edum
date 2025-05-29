import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('planId');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in.');
      return;
    }

    if (!planId) {
      setError('Invalid subscription plan.');
      return;
    }

    if (!name || !cardNumber || !expiry || !cvv) {
      setError('Please fill in all fields.');
      return;
    }

    if (cardNumber.length < 12 || cvv.length < 3) {
      setError('Invalid card details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const last4 = cardNumber.slice(-4);
      
      // Find pending subscriptions for this specific plan
      const { data: pendingSubscriptions, error: fetchError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .eq('plan_id', planId);

      if (fetchError) throw fetchError;

      if (!pendingSubscriptions || pendingSubscriptions.length === 0) {
        throw new Error('No pending subscription found');
      }

      // Update the first pending subscription to active
      const { error: updateError } = await supabase
        .from('user_subscriptions')
        .update({ status: 'active' })
        .eq('id', pendingSubscriptions[0].id);

      if (updateError) throw updateError;

      // Save payment details
      const { error: paymentError } = await supabase
        .from('payment_details')
        .insert({
          user_id: user.id,
          name,
          card_last4: last4,
          expiry,
        });

      if (paymentError) throw paymentError;

      // Update subscription status in context
      await checkSubscription(user.id);

      setSuccess(true);
      
      // Short delay to show success message
      setTimeout(() => {
        navigate('/activities');
      }, 1500);
    } catch (err: any) {
      console.error('Error processing payment:', err);
      setError(err.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter Card Details</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            Payment successful! Redirecting to activities...
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cardholder Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              required
              maxLength={16}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Expiry (MM/YY)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">CVV</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 mt-1"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded mt-4"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;