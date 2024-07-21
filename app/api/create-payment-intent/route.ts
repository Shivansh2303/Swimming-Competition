import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const { amount, customerId } = await req.json();

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (typeof customerId !== 'string' || !customerId.trim()) {
      return NextResponse.json({ error: 'Invalid customer ID' }, { status: 400 });
    }

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId?customerId:"",
      automatic_payment_methods:{enabled:true}
    });

    // Return the PaymentIntent data
    return NextResponse.json({ paymentIntent }, { status: 200 });
  } catch (error: any) {
    // Handle Stripe errors and other unexpected errors
    console.error('Error creating PaymentIntent:', error.message);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
