import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {btoa} from "buffer";
import type { NextAuthOptions } from 'next-auth'
import { authorize, User } from "services/wordpress-auth-service";
import GoogleProvider from "next-auth/providers/google";
import { autologinOrRegisterUser } from "./nextauth.functions";

declare module "next-auth" {
    interface Session {
        wpJwtToken: string;
        email: string;
        id: number;
        username: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "E-mail", type: "text", placeholder: "Zadejte e-mail"},
                password: { label: "Heslo", type: "password", placeholder: "Zadejte heslo" }
            },
            async authorize(credentials, _req): Promise<any> {

                if (credentials === undefined){
                    return null;
                }

                const password = btoa(credentials.password);

                return await authorize({passwordBase64: password, username: credentials.username})
                },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            async profile(profile, _tokens): Promise<any>  {
                const user = await autologinOrRegisterUser(profile);

                return user;
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user as User) {

                token.wpJwtToken = user.wpJwtToken;
                token.email = user.email;
                token.username = user.username;
                token.id = user.id;
            }
            return token
        },

        async session({ session, token }: any) {
            if (token) {
                session.wpJwtToken = token.wpJwtToken;
                session.email = token.email;
                session.id = token.id;
                session.username = token.username;
            }
            return session
        },

        async signIn({ account, profile }) {

            if(account === null) {
                return false;
            }

            if (account.provider === "google") {
              return true;
            }

            return true // Do different verification for other providers that don't have `email_verified`
          },
    },
    pages: {
        signIn: "/sign-in",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
