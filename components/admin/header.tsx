import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-full mx-auto flex items-center justify-between px-6 py-3">
        
        <div className="flex items-center gap-2">
          <Image
            src="https://swimforindiaacademy.com/wp-content/uploads/2020/01/jd-1-1-scaled.jpg" 
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
            unoptimized
          />
          <span className="text-2xl font-bold text-gray-800">Swim For India Academy</span>
        </div>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="" 
            alt="User Avatar"
            width={32}
            height={32}
          />
        </div>
      </div>
    </header>
  );
}
