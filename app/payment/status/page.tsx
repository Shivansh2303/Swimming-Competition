// pages/status.tsx
"use client"
import ErrorBoundary from '@/components/ErrorBoundary';
import axios from 'axios';
import { useEffect, useState, Suspense, useRef, useCallback } from 'react';

import { useSearchParams } from 'next/navigation';
interface ParamsInterface {
    paymentID: string;
    paymentStatus: string;
    paymentRequestID: string;
}

function CreateSwimmer({ params }: Readonly<{ params: ParamsInterface }>) {
    const [userData, setUserData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const hasHandledUser = useRef(false); // Ref to track if handleUser has been called
    const handleUser = useCallback(async(userData: any) =>{
        if (hasHandledUser.current) return; // Check if handleUser has already been called
        hasHandledUser.current = true; // Set ref to true to prevent further calls

        if (userData) {
            userData.paymentID = params.paymentID ?? "";
            userData.paymentStatus = params.paymentStatus ?? "";
            userData.paymentRequestID = params.paymentRequestID ?? "";
            
            try {
                const response = await axios.post('/api/create-swimmer', { userData });
                setUserData(response.data);
                
            } catch (error) {
                console.error("Failed to create swimmer", error);
            } finally {
                setLoading(false);
            }
        }
    },[params.paymentID, params.paymentRequestID, params.paymentStatus])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("swimmerData");

            if (data && loading) {
                try {
                    const swimmerData = JSON.parse(data);
                    handleUser(swimmerData);
                } catch (error) {
                    console.error("Failed to parse swimmerData from localStorage", error);
                }
            } else {
                console.warn("No swimmerData found in localStorage");
            }
        }
    }, [params,handleUser,loading]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-2">
            <div className={`relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
                <div className="flex flex-col items-center">
                    <svg viewBox="0 0 24 24" className={`text-green-600 w-20 h-20 mb-6 drop-shadow-lg ${loading ? "hidden" : ""}`}>
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <h3 className="md:text-3xl text-xl text-gray-900 font-bold text-center mb-2">
                        {userData?.paymentStatus === 'Credit' ? "Payment Done!" : userData?.paymentStatus === '' ? "Payment Failed" : ""}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">Thank you for completing your secure online payment.</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <p className="text-lg font-semibold text-center w-full">Here is your payment details</p>
                </div>
                <div className="text-center mb-6">
                    <p className="text-2xl font-bold text-indigo-700">Swim For India Academy</p>
                    <p className="text-lg font-semibold text-gray-700">Delhi Open Talent Search Swimming Competition 2025</p>
                </div>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow p-5 bg-gray-50">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead>
                            <tr>
                                <th className="py-3 text-sm font-bold text-gray-900 text-left">Field</th>
                                <th className="py-3 text-sm font-bold text-gray-900 text-left">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Swimmer&#39;s Name</td>
                                <td className="py-3 text-sm text-gray-700">{userData?.swimmerFirstName ?? "First Name"}{" "}{userData?.swimmerLastName ?? "Last Name"}</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Email</td>
                                <td className="py-3 text-sm text-gray-700">{userData?.email ?? "example@mail.com"}</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Contact</td>
                                <td className="py-3 text-sm text-gray-700">{userData?.parent1Contact ?? "xxxxxxxxxx"}</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Amount</td>
                                <td className="py-3 text-sm text-gray-700">Rs. {userData?.amount ?? "xxx"}</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Transaction ID</td>
                                <td className="py-3 text-sm text-gray-700">{userData?.paymentID ?? "xxxxxxxxxx"}</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-sm font-bold text-gray-900">Date & Time</td>
                                <td className="py-3 text-sm text-gray-700">{userData?.createdAt ? new Date(userData?.createdAt).toLocaleString() : new Date().toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-8">
                    <p className="text-lg font-semibold text-gray-800 mb-4">Have a great day!</p>
                    <a href="/" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow transition-colors duration-200">
                        Register Another Form
                    </a>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-2xl z-10">
                        <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600" viewBox="0 0 100 101" fill="none">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
}


function PaymentStatusInner() {
    const paymentParams = useSearchParams();
    const params = {
        paymentID: paymentParams.get("payment_id") ?? '',
        paymentStatus: paymentParams.get("payment_status") ?? '',
        paymentRequestID: paymentParams.get("payment_request_id") ?? ''
    }

    return <CreateSwimmer params={params} />;
}
export default function PaymentStatus() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentStatusInner />
            </Suspense>
        </ErrorBoundary>
    );
}
