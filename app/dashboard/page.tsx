import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // <- this line

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="p-6 text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
    </div>
  );
}
