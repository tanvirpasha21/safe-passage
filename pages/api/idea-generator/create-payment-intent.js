import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { profile } = req.body;

    if (!profile || !profile.sector || !profile.degree || !profile.motivation) {
      return res.status(400).json({ error: 'Missing required profile fields' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // £10.00 in pence
      currency: 'gbp',
      payment_method_types: ['card'],
      metadata: {
        product: 'idea_generator',
        sector: profile.sector.slice(0, 500),
        degree: profile.degree.slice(0, 500),
        motivation: profile.motivation.slice(0, 500),
      },
      description: 'SafePassage Innovator Founder Idea Generator — 3 personalised UK business ideas',
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('[create-payment-intent]', err);
    return res.status(500).json({ error: err.message || 'Failed to create payment intent' });
  }
}
