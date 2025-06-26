// pages/status.tsx
"use client"
import ErrorBoundary from '@/components/ErrorBoundary';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useRef, useCallback } from 'react';

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

    // Extract payment status message to avoid nested ternary
    let paymentStatusMessage = "";
    if (userData?.paymentStatus === 'Credit') {
        paymentStatusMessage = "Payment Done!";
    } else if (userData?.paymentStatus === '') {
        paymentStatusMessage = "Payment Failed";
    }

    return (
        <div className={`w-screen`}>
        <div className={`mx-auto mt-8 max-w-screen-lg px-2  ${loading ? "opacity-20" : ""}`}>
            <div className="bg-white p-6 md:mx-auto">
                <svg viewBox="0 0 24 24" className={`text-green-600 w-16 h-16 mx-auto my-6`}>
                    <path fill="currentColor" className={`${loading ? "hidden" : ""}`}
                          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        {paymentStatusMessage}
                    </h3>
                    <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                </div>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                <p className="flex-1 text-xl font-sans text-center font-semibold text-black-900">Here is your payment details</p>
            </div>
             
            <div className="mt-6 overflow-hidden rounded-xl border shadow-lg p-5">
                <div className="text-center mt-5 p-5">
                <p className="text-2xl font-bold text-gray-600 ">Swim For India Academy</p>
                <p className="text-xl font-bold">Delhi Open Talent Search Swimming Competition 2025</p>
            </div>
                <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 " aria-hidden="true">
                    <tbody className="lg:border-gray-300">
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Swimmers Name
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                {userData?.swimmerFirstName ?? "First Name"}{" "}{userData?.swimmerLastName ?? "Last Name"}
                            </td>
                        </tr>
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Email
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                {userData?.email ?? "example@mail.com"}
                            </td>
                        </tr>
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Contact
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                {userData?.parent1Contact ?? "xxxxxxxxxx"}
                            </td>
                        </tr>
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Amount
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                Rs. {userData?.amount ?? "xxxx` "}
                            </td>
                        </tr>
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Transaction ID
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                {userData?.paymentID ?? "xxxxxxxxxx"}
                            </td>
                        </tr>
                        <tr className="">
                            <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                Date & Time
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                {new Date(userData?.createdAt).toLocaleString() ?? new Date().toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <p className='pt-5 text-xl font-semibold'> Have a great day! </p>
                <div className="py-10 text-center">
                    <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                        Register Another Form
                    </a>
                </div>
            </div>
        </div>
        <div className={`absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 ${loading ? "" : "hidden"}`}>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
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
