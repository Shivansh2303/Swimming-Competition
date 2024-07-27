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
        <form onSubmit={handleSubmit} className={`w-full mx-auto bg-white rounded-lg  `}>
            <div className="text-center mt-5 p-5">
                <p className="text-2xl font-bold text-gray-600 ">Swim For India Academy</p>
                <p className="text-xl font-bold">Delhi Open Talent Search Swimming Competition 2024</p>
            </div>
            <div className={`container mx-auto  p-8  bg-gray-200 rounded-lg max-w-4xl ${loading ? "opacity-20" : ""} `}>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-screen w-full md:pl-5">
                        <div className="p-6 bg-white rounded-lg">
                            <p className="pl-2 text-gray-800 font-bold text-xl">Swimmer Details</p>
                            <p className=" pl-2 text-gray-600  text-m">{userData?.swimmerFirstName ?? "Shivansh Kate"}</p>
                            <p className="pl-2 text-gray-600 text-m">{userData?.email ?? "sample@mail.com"}</p>
                            <div className="text-[15px] mt-2">
                                <div className="flex flex-wrap border rounded-lg mb-3">
                                    <div className="w-1/2 px-2 py-2">Gender</div>
                                    <div className="w-1/2 text-center px-2 py-2 border-r">{userData?.gender ?? "Female"}</div>
                                    <div className="w-1/2 px-2 py-2">Date of Birth</div>
                                    <div className="w-1/2 text-center px-2 py-2 border-r">{new Date(userData?.dob).toDateString() ?? new Date().toDateString()}</div>
                                    <div className="w-1/2 px-2 py-2 border-b">State & Country </div>
                                    <div className="w-1/2 text-center px-2 py-2 border-b border-r">{userData?.state ?? "Delhi"}{", "}{userData?.country ?? "India"}</div>
                                    <div className="w-1/2 px-2 py-2 border-b">Age Group</div>
                                    <div className="w-1/2 text-center px-2 py-2 border-b border-r">{userData?.ageGroup ?? "Masters Group"}</div>
                                    <div className="w-1/2 px-2 py-2">Parent Contact</div>
                                    <div className="w-1/2 text-center px-2 py-2 border-r">{userData?.parent1Contact ?? "9999999999"}</div>
                                </div>
                                <div className="flex justify-between font-bold text-sm mb-2">
                                    <p>Total Amount</p>
                                    <p>Rs. {userData?.amount}</p>
                                </div>
                            </div>
                            <div>

                                <button disabled={loading&&!userData?.amount} className="btn btn-primary w-full py-2 bg-blue-600 text-white rounded-lg flex justify-center items-center">
                                    PAY <span className="fas fa-dollar-sign ml-2"></span>{userData?.amount}<span className="fas fa-arrow-right ml-3"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

const WrappedCheckoutForm = () => (
    <CheckoutForm />
);

export default WrappedCheckoutForm;
