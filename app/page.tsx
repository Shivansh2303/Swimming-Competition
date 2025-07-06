import SwimmingRegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import RegistrationClosed from "@/components/RegistrationForm/RegistrationClosed";
const IsRegistrationOpen = process.env.NEXT_PUBLIC_IS_REGISTRATION_OPEN === 'true'; 
console.log("IsRegistrationOpen:", (IsRegistrationOpen));
export default function Home() {
  return (
    IsRegistrationOpen ? (
      //  <main className="flex min-h-screen flex-col items-center justify-between p-5  ">
      //   <div className="mb-6 mt-10 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 text-center shadow-md max-w-md">
      //     Registration will open soon.
      //   </div>
      // </main>
      <main className="flex min-h-screen flex-col items-center justify-between p-5  bg-[url('/IMG_1639.JPG')] bg-repeat-round">
        {/* <SwimmingRegistrationForm/> */}
         
         <div>
          
      <h1 className="md:text-3xl text-2xl mb-4 mt-4 font-bold font-sans  text-center text-gray-800">
        Swim For India Academy
      </h1>
      <h1 className="md:text-2xl text-lg mb-4 font-bold font-sans text-center text-gray-800">
        Sunday, 24 August
      </h1>
      <h1 className="md:text-[25px] text-lg text-center mb-4 font-bold font-sans">
        Delhi Open Talent Search Swimming Competition 2025
      </h1>
      <div className="flex justify-center">
            <div className="rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 text-center shadow-md max-w-md">
              Registration will open soon.
            </div>
          </div>
      </div>
       
      </main>
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-between p-5  ">
        {/* <div className="mb-6 mt-10 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 text-center shadow-md max-w-md">
          Registration will open soon.
        </div> */}
        <RegistrationClosed/>
      </main>
    )
  );
}
