import type { NextAuthOptions } from "next-auth";
import GithubProviders from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProviders({
      clientId: process.env.GITHUB_CLIENT_ID as string ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text",placeholder: "your-cool-username" },
        password: { label: "Password", type: "password" ,placeholder: "your-awesome-password"},
      },
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            name: "Admin User",
            username:"admin",
            password: "admin@123",
          },
        ];
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
 
};
