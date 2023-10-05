import { SignOptions, sign } from "jsonwebtoken";
import { LoggedUser, NotRegisteredUser } from "app/api/auth/[...nextauth]/user-models";
import { getUserInfoFromToken } from "app/api/auth/[...nextauth]/wordpress-auth";

export const createToken = (email: string, username: string): string => {
  // payload data
  let payload = {
    email: email,
    username: username,
  };
  // secret key
  const secretKey = process.env.NEXTAUTH_SECRET ?? "";

  // options
  let signOptions: SignOptions = {
    algorithm: "HS256", // HS256: HMAC using SHA-256 hash algorithm
    expiresIn: "1h", // token will expire in 1 hour
  };

    // generating token
    var token = sign(payload, secretKey, signOptions);
    return token;
}

export const getProfileFromExternalProvider = async (profile: any): Promise<LoggedUser | NotRegisteredUser | null> => {
  const token = createToken(profile.email, profile.email);

  const result = await getUserInfoFromToken(token);

  if (typeof result === "string") {
    return {
      ...profile,
      id: profile.email,
      email: profile.email,
      error: result,
    } as NotRegisteredUser;
  }

  return result;
}