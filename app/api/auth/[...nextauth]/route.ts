import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { handlers } from "@/app/config/auth";

export const NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async redirect({ baseUrl }: { baseUrl: string }) {
            // Always redirect to home page after sign-in
            return `${baseUrl}/home`;
        }
    }
};

export const handler = NextAuth(NextAuthOptions);
export const { GET, POST } = handlers;
