"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";


const CheckoutForm = (props: any) => {
    const [userData, setUserData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("swimmerData");
            if (data) {
                try {
                    const swimmerData = JSON.parse(data);
                    setUserData(swimmerData);
                    setLoading(false)
                } catch (error) {
                    console.error("Failed to parse swimmerData from localStorage", error);
                }
            } else {
                console.warn("No swimmerData found in localStorage");
            }
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/create-customer', {});
            const { data: paymentResponse } = await axios.post('/api/create-payment-intent', { token: response.data, userData });
            router.push(paymentResponse.longurl)
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-lg mx-auto p-4 bg-white rounded-lg mt-32  shadow-2xl ${loading ? "opacity-15" : ""}`}>
            <div className="container mx-auto flex justify-center mt-5">
                <div className="  rounded-lg ">
                    <div>
                        <div className="flex pt-3 pl-3 pb-10">
                            <div><img src="https://img.icons8.com/ios-filled/50/000000/visa.png" width="60" height="80" /></div>
                            <div className="mt-3 pl-2">
                                <span className="text-lg font-bold text-gray-700">{userData.swimmerFirstName} {userData.swimmerSecondName}</span>
                                <div>
                                    <span className="text-sm text-gray-700">{userData.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 px-3">
                            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg flex py-2 pl-2">
                                <div className="form-check">
                                    <input type="radio" name="optradio" className="form-check-input mt-3" checked />
                                </div>
                                <div className="border-l pl-2">
                                    <span className="text-blue-500 text-xs">Total amount </span>
                                    <div>
                                        <span className="text-lg text-blue-700">Rs. </span>
                                        <span className="text-lg font-bold text-blue-600">8245</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between px-3 pt-4 pb-3">
                            <div>
                                <button className="text-gray-700 text-m p-2 rounded font-normal leading-9 hover:bg-red-300 hover:cursor-pointer " onClick={() => router.back()}>Go back</button>
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary w-44 h-18 rounded-lg text-lg border-2 bg-blue-300 ">Pay amount</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

const WrappedCheckoutForm = () => (
    <CheckoutForm amount={20} />
);

export default WrappedCheckoutForm;
