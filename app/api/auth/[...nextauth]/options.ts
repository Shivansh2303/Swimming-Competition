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
            id: process.env.NEXT_PUBLIC_ADMIN_ID as string??"",
            name: process.env.NEXT_PUBLIC_ADMIN_NAME as string??"",
            username:process.env.NEXT_PUBLIC_ADMIN_USERNAME as string??"",
            password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string ??"",
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
