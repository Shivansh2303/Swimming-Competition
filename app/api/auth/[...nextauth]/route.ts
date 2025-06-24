import NextAuth from "next-auth";
import { authOptions } from "./options";
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin@123",
  },
];

 
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
