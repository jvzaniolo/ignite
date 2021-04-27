import { useRouter } from 'next/router';

import { useSession, signIn } from 'next-auth/client';

import { api } from '../services/api';
import { getStripeJS } from '../services/stripe-js';

import styles from '../styles/SubscribeButton.module.scss';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
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
