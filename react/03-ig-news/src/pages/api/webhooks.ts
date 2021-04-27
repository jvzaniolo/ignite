import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { Readable } from 'stream';

import { stripe } from '../../services/stripe';
import { manageSubscription } from './_lib/manageSubscription';

const EventType = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buff = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buff,
        secret,
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const type = event.type;

    if (EventType.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.updated': {
            break;
          }
          case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;

            await manageSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );

            break;
          }
          case 'checkout.session.completed': {
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await manageSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );

            break;
          }
          default:
            throw new Error('Unknown event type.');
        }
      } catch (err) {
        return res.json({ message: err.message });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
