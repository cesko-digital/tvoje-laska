import { SignOptions, sign } from "jsonwebtoken";

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
