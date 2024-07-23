// pages/success.tsx
"use client"
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PaymentDetails {
    name: string;
    email: string;
    contactNumber: string;
    transactionId: string;
    amount: number;
    time: string;
}

const SuccessPage: NextPage = () => {
    //   const router = useRouter();
    const [userData, setUserData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<PaymentDetails>({
        name: '',
        email: '',
        contactNumber: '',
        transactionId: '',
        amount: 0,
        time: '',
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("swimmerData");
            
            if (data) {
                try {
                    const swimmerData = JSON.parse(data);
                    console.log(swimmerData);
                    handleUser(swimmerData)
                    setUserData(swimmerData);
                    setLoading(false)
                } catch (error) {
                    console.error("Failed to parse swimmerData from localStorage", error);
                }
            } else {
                console.warn("No swimmerData found in localStorage");
            }
        }

        async function handleUser(userData: any) {
            if (userData) {
                await axios.post('/api/create-swimmer', { userData });
            }
        }
    }, []);

    //   useEffect(() => {
    //     if (router.query) {
    //       setDetails({
    //         name: router.query.name as string,
    //         email: router.query.email as string,
    //         contactNumber: router.query.contactNumber as string,
    //         transactionId: router.query.transactionId as string,
    //         amount: parseFloat(router.query.amount as string),
    //         time: router.query.time as string,
    //       });
    //     }
    //   }, [router.query]);

    return (
        <div className="w-screen">

            <div className="mx-auto mt-8 max-w-screen-lg px-2">
                <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                    <p className="flex-1 text-4xl font-sans items-center font-bold text-black-900">Payments Details</p>
                </div>
                <div className="mt-6 overflow-hidden rounded-xl border shadow">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="hidden border-b lg:table-header-group">
                            <tr className="">
                                <td width="50%" className="whitespace-normal py-4 text-xl font-bold text-black-500 sm:px-6">Fields</td>
                                <td className="whitespace-normal py-4 text-xl font-bold text-black-500 sm:px-6 ">Values</td>
                            </tr>
                        </thead>
                        <tbody className="lg:border-gray-300">
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Swimmers Name
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">{userData.swimmerFirstName}</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData.swimmerFirstName} {userData.swimmerSecondName}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Email
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">09 January, 2022</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData.email}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Contact
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">15 December, 2021</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{userData.parent1Contact}</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Amount
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">14 November, 2021</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">Rs. 1500</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Transaction ID
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">15 October, 2021</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">5d4g3d5g4t35h4tg</td>
                            </tr>
                            <tr className="">
                                <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                    Date & Time
                                    <div className="mt-1 lg:hidden">
                                        <p className="font-normal text-gray-500">15 October, 2021</p>
                                    </div>
                                </td>
                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">15 October, 2021</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    );
};

export default SuccessPage;
