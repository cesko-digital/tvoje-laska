import "next-auth";
import { ISODateString } from 'next-auth'

declare module "next-auth" {
  interface User {
    name?: string | null
    email?: string | null
    image?: string | null
  }

  interface Session {
    user: User;
    wpJwtToken: string;
    expires: ISODateString;
  }
}
