/* eslint-disable @next/next/no-img-element */
const RegistrationClosed = () => {
    return (
      <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <p className="text-lg text-gray-800 mb-6 font-sans font-normal">
          Registration for our swimming competition is now closed. Thank you for
          your support! We hope to see you at our future events. For further
          information, call Dr. Jitender Tokas at 706-519-5811.
        </p>
        <img 
          src="/registration_closed.jpg" 
          alt="Swimming competition" 
          className="max-w-full h-auto border border-gray-300 rounded-lg"
        />
      </div>
    );
  };
  
  export default RegistrationClosed;
  