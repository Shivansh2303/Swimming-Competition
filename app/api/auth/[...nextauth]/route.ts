import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin@123",
  },
];

export const  authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        if (user) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
