import { useSession, signIn } from 'next-auth/client';
import { getStripeJS } from '../services/stripe-js';
import { api } from '../services/api';

import styles from '../styles/SubscribeButton.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button type="button" className={styles.button} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
