import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "@/auth.config";
// import CredentialsProvider from "next-auth/providers/credentials";
// import {getUserByEmail} from "@/app/actions/authActions";
// import bcrypt from "bcryptjs";

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session({token, session}) {

            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            console.log(
                "Session callback called with token:",
                token,
                "session:",
                session
            )

            return session;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    ...authConfig
});