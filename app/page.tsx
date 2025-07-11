import SwimmingRegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import RegistrationClosed from "@/components/RegistrationForm/RegistrationClosed";
const IsRegistrationOpen = process.env.NEXT_PUBLIC_IS_REGISTRATION_OPEN === 'true'; 
console.log("IsRegistrationOpen:", (IsRegistrationOpen));
export default function Home() {
  return (
    IsRegistrationOpen ? (
      <main className="flex min-h-screen flex-col items-center justify-between p-5  bg-[url('/IMG_1639.JPG')] bg-repeat-round">
        <SwimmingRegistrationForm/>
      </main>
    ) : (
      <main className="flex min-h-screen flex-col items-center justify-between p-5  ">
        <RegistrationClosed/>
      </main>
    )
  );
}
