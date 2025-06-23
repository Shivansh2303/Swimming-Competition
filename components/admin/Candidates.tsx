"use client";

import { useEffect, useState } from "react";

type Swimmer = {
  _id: string;
  swimmerFirstName: string;
  swimmerLastName: string;
  gender: string;
  grade: string;
  school: string;
  state: string;
  dob: string;
  email: string;
  ageGroup: string;
  event_freestyle: boolean;
  freestyleTime	: string;
  event_breast_Stroke:	false;
  breast_StrokeTime	: string;
  event_back_Stroke:	true;
  back_StrokeTime	: string;
  event_butterfly:	false;
  butterflyTime  : string;
  relay: boolean;
  swimation: boolean;
  parentName: string;
  parent1Contact: string;
  parent2Contact: string;
  coachContact: string;
  paymentStatus: string;
  amount: number;
  proofOfAge: string;
  terms_conditions: boolean;
  referral: string;
};

export default function SwimmerPerformance() {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSwimmers = async () => {
      const res = await fetch("/api/admin", {
        method: "GET",
      });
      const data = await res.json();
      setSwimmers(data.data ?? []);
      if (!data.data || data.data.length === 0) {
        console.error("No swimmer data found");
      }
    };

    fetchSwimmers();
  }, []);
  const [filteredSwimmers, setFilteredSwimmers] = useState<Swimmer[]>(swimmers);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = swimmers.filter((s) => {
        const fullName = `${s.swimmerFirstName} ${s.swimmerLastName}`.toLowerCase();
        return (
          fullName.includes(searchQuery.toLowerCase()) ||
          s.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.ageGroup?.toLowerCase().includes(searchQuery.toLowerCase())||
          s.grade?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.parentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.parent1Contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.parent2Contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.coachContact?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredSwimmers(filtered);
    }, 30);

    return () => clearTimeout(handler);
  }, [searchQuery, swimmers]);

  return (
    <div className="w-full p-6 mt-8 bg-white rounded-xl shadow">
     <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
    <div>
      <h2 className="text-2xl font-semibold">Swimmers Performance</h2>
      <p className="text-sm text-gray-500">Freestyle Event - Group List</p>
    </div>
    <div className="flex">
      <input
        type="text"
        placeholder="Search by name, school, or age group"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

      <div className="w-[1400px] h-[600px] overflow-auto rounded-lg border border-gray-200">
      <table className="min-w-[1200px] w-full table-auto">
        <thead className="text-gray-500 text-sm text-left font-semibold">
        <tr className="bg-gray-100 ">
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Name</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Gender</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Grade</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">School</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">State</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">DOB</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Email</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Age Group</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Event & Duration</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Relay</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Swimation</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Proof Of Age</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Parent Name</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Parent Contact 1</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Parent Contact 2</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Coach Contact</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Amount Paid</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Terms & Conditions</th>
          <th className="sticky top-0 bg-white z-10 py-2 px-4">Referral</th>
        </tr>
        </thead>
        <tbody className="text-gray-700 ">
        {filteredSwimmers.map((swimmer) => (
          <tr key={swimmer._id} className="border-t">
          <td className="px-4 font-medium">
            {swimmer.swimmerFirstName} {swimmer.swimmerLastName}
          </td>
          <td className="">{swimmer.gender}</td>
          <td className="">{swimmer.grade}</td>
          <td className="">{swimmer.school}</td>
          <td className="">{swimmer.state}</td>
          <td className="">
            {swimmer.dob ? new Date(swimmer.dob).toLocaleDateString() : "N/A"}
          </td>
          <td className="">{swimmer.email}</td>
          <td className="">{swimmer.ageGroup}</td>
          <td className=" ">
            <div>
            {swimmer.event_freestyle ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              freestyle {swimmer.freestyleTime ?? "N/A"}
            </span>
            ) : <></>}
            </div><div>
            {swimmer.event_back_Stroke ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Backstroke {swimmer.back_StrokeTime ?? "N/A"}
            </span>
            ) : <></>}
            </div><div>
            {swimmer.event_breast_Stroke ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              breast Stroke {swimmer.breast_StrokeTime ?? "N/A"}
            </span>
            ) : <></>}
            </div><div>
            {swimmer.event_butterfly ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              butterfly {swimmer.butterflyTime ?? "N/A"}
            </span>
            ) : <></>}
            </div>
          </td>
          <td className="">
             <input type="checkbox" name="swimation" id="swimation" checked={swimmer.relay}/>
           
          </td>
          <td className="">
            <input type="checkbox" name="swimation" id="swimation" checked={swimmer.swimation}/>

          </td>
          <td className="">
            {swimmer.proofOfAge ? (
            <a
              href={swimmer.proofOfAge}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View
            </a>
            ) : (
            <span className="text-gray-400">N/A</span>
            )}
          </td>
          <td className="">{swimmer.parentName || "N/A"}</td>
          <td className="px-4">
            {swimmer.parent1Contact ? (
            <a
              href={`https://wa.me/${swimmer.parent1Contact.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {swimmer.parent1Contact}
            </a>
            ) : (
            <span className="text-gray-400">N/A</span>
            )}
          </td>
          <td className="px-4">
            {swimmer.parent2Contact ? (
            <a
              href={`https://wa.me/${swimmer.parent2Contact.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {swimmer.parent2Contact}
            </a>
            ) : (
            <span className="text-gray-400">N/A</span>
            )}
          </td>
          <td className="px-4">
            {swimmer.coachContact ? (
            <a
              href={`https://wa.me/${swimmer.coachContact.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {swimmer.coachContact}
            </a>
            ) : (
            <span className="text-gray-400">N/A</span>
            )}
          </td>
          <td className="">
           
            <span className="ml-2 text-gray-600">₹{swimmer.amount}</span>
          </td>
          <td className="">
            {swimmer.terms_conditions ? (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Accepted</span>
            ) : (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Not Accepted</span>
            )}
          </td>
          <td className="">{swimmer.referral || "N/A"}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
