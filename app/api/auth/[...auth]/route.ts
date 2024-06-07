import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

// Firebase Admin SDK setup
const serviceAccount = require('@/path/to/serviceAccountKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const firebaseAdminConfig = {
  credential: cert(serviceAccount),
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(firebaseAdminConfig),
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
