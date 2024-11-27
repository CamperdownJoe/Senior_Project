import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from 'bcryptjs';

import { env } from "@/env.mjs";
import { sendVerificationRequest } from "@/lib/email";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
      sendVerificationRequest,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
      
        const user = await prisma.user.findUnique({
          where: { email: email }
        });
      
        if (!user) {
          return null;
        }
    
        const password = credentials.password as string;
        const hashedPassword = user.password as string;
      
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      
      
        if (!isPasswordValid) {
          return null;
        }
      
        return user;
      }
    }),
  ],
} satisfies NextAuthConfig;