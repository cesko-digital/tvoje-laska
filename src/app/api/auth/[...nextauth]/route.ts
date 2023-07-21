import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {btoa} from "buffer";
import type { NextAuthOptions } from 'next-auth'
import { authorize, getUserInfoFromToken } from "services/wordpress-auth-service";
import GoogleProvider from "next-auth/providers/google";
import { createToken } from "./nextauth.functions";
import { LoggedUser, NotRegisteredUser } from "models/user-models";

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
      name: "Credentials",
      credentials: {
        username: {
          label: "E-mail",
          type: "text",
          placeholder: "Zadejte e-mail",
        },
        password: {
          label: "Heslo",
          type: "password",
          placeholder: "Zadejte heslo",
        },
      },
      async authorize(credentials, _req): Promise<any> {
        if (credentials === undefined) {
          return null;
        }

        const password = btoa(credentials.password);

                const result = await authorize({passwordBase64: password, email: credentials.username});

                if(typeof result === 'string') {
                    throw new Error(result);
                }

                if(result?.wpJwtToken) {
                    return await getUserInfoFromToken(result.wpJwtToken);
                }
                return result;
                },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            async profile(profile, tokens): Promise<any>  {
                const token = createToken(profile.email, profile.email);

                const result = await getUserInfoFromToken(token);

                if(typeof result === 'string') {
                    return { 
                        ...profile,
                        id: profile.email,
                        email: profile.email, 
                        error: result 
                    } as NotRegisteredUser;
                }

                return result;
            },
            authorization: { 
                
                params: {

                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user as LoggedUser) {

                token.wpJwtToken = user.wpJwtToken;
                token.email = user.email;
                token.username = user.username;
                token.id = user.id;
                token.roles = user.roles;
                token.nickname = user.nickname;
                token.displayName = user.displayName;
            }
            return token
        },

        async session({ session, token }: any) {
            if (token) {
                session.wpJwtToken = token.wpJwtToken;
                session.email = token.email;
                session.id = token.id;
                session.username = token.username;
                session.roles = token.roles;
                session.nickname = token.nickname;
                session.displayName = token.displayName;
            }
            return session
        },

        async signIn({ account, profile }) {

            if(account === null) {
                return false;
            }
            
            if (account.provider === "google") {
                const token = createToken(profile?.email ?? '', profile?.email ?? '');

                const result = await getUserInfoFromToken(token);

                if(typeof result === 'string') {
                    return `/auth/sign-in?errorCode=${result}`;
                }

              return true;
            }

            return true // Do different verification for other providers that don't have `email_verified`
          },
    },
    pages: {
        signIn: "/auth/sign-in",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
