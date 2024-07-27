// pages/status.tsx
"use client"
import axios from 'axios';
import { ReadonlyURLSearchParams } from 'next/navigation';
import {  useEffect,useState } from 'react';
interface ParamsInterface {
    paymentID: string;
    paymentStatus: string;
    paymentRequestID: string;
}

export default function CreateSwimmer(params:Readonly<ReadonlyURLSearchParams>){
    const [file, setFile] = useState<Blob>()
    const [userData, setUserData] = useState<any>({})
    const base64toBlog=async(file:any)=>{
        const base64Response=await fetch(file);
        const blob=await base64Response.blob();
        setFile(blob);
        return blob; 
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("swimmerData");
            
            if (data) {
                try {
                    const swimmerData = JSON.parse(data);
                    handleUser(swimmerData)
                } catch (error) {s
                    console.error("Failed to parse swimmerData from localStorage", error);
                }
            } else {
                console.warn("No swimmerData found in localStorage");
            }
        }

        async function handleUser(userData: any) {
            if (userData) {
                userData.paymentID=params.get("payment_id")??"";
                userData.paymentStatus=params.get("payment_status")??"";
                userData.paymentRequestID=params.get("payment_request_id")??"";
                userData.proofOdAge=null;
                const swimmerData = await axios.post('/api/create-swimmer', { userData });
                setUserData(swimmerData.data);
            }
        }
    },[params]);

    return (
        <div className="w-screen bg-white">
            <div className="mx-auto mt-8 max-w-screen-lg px-2">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{userData?.paymentStatus?"Payment Done!":"Payment"}</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    </div>
                </div>
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 text-xl font-sans text-center font-semibold text-black-900">Here is your payment details</p>
                </div>
                <div className="mt-6 overflow-hidden rounded-xl border shadow-lg p-5 ">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 bg-gray-400" aria-hidden="true">
                  
                        <tbody className="lg:border-gray-300 ">
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold  text-gray-900 sm:px-6">
                                    Swimmer Name
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData?.swimmerName}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Email
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData?.email}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Contact
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData?.parent1Contact}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Amount
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData?.amount}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Transaction ID
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData?.paymentID?? ";skelgkrglerk;nglrs;kgf"}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Date & Time
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{new Date(userData?.createdAt).toLocaleString()??new Date()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <p className='pt-5 text-xl font-semibold'> Have a great day!  </p>
                    <div className="py-10 text-center">
                        <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            Register Another Form
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

