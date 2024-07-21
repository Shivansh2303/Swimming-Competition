"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    CardElement,
    Elements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = (amount:any) => {
    const stripe = useStripe();
    const elements = useElements();
    // const [amount, setAmount] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState("");
    // useEffect(() => {
    //     const handleChange=async()=>{
    //         const { data: paymentIntent } = await axios.post('/api/create-payment-intent', {
    //             amount,
    //             customerId: "skdkdjz;skgndd" 
    //         });
    //         setClientSecret(paymentIntent.paymentIntent.client_secret);
    //     }
    //     handleChange()
    // }, [amount]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe.js has not yet loaded.
        }

        setLoading(true);
        setError(null);

        try {
            const { data: customer } = await axios.post('/api/create-customer', { email });
            console.log({ customerResponse: customer.customer.id });

            const { data: paymentIntent } = await axios.post('/api/create-payment-intent', {
                amount,
                customerId: customer.customer.id 
            });
            console.log({ paymentIntentResponse: paymentIntent });

            const { error: paymentError } = await stripe.confirmCardPayment(paymentIntent.paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        email,
                    },
                },
            });

            if (paymentError) {
                setError(paymentError.message);
                console.error(paymentError.message);
            } else {
                console.log('Payment successful!');
            }
        } catch (err:any) {
            setError(err.message || "An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-gray-100 rounded-lg mt-48  shadow-2xl">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="card-element">
                Credit Card
            </label> 
            <CardElement
                id="card-element"
                className="p-3 border border-gray-300 rounded-md bg-gray-100"
            />
            {/* {clientSecret && <PaymentElement />} */}
        </div>
        <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!stripe || loading}
        >
            {loading ? "Processing..." : "Pay"}
        </button>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
    </form>
    );
};

const WrappedCheckoutForm = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm amount={20} />
    </Elements>
);

export default WrappedCheckoutForm;
