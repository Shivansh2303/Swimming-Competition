import SwimmingRegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import RegistrationClosed from "@/components/RegistrationForm/RegistrationClosed";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-5  bg-[url('/IMG_1639.JPG')] bg-repeat-round">
    //   <SwimmingRegistrationForm/>
    // </main>
    <main className="flex min-h-screen flex-col items-center justify-between p-5  ">
      <RegistrationClosed/>
    </main>
  );
}
