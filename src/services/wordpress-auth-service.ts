import jwt_decode from 'jwt-decode';
import axios from "axios";

const http = axios.create({
    baseURL: process.env.WP_URL,
    headers: {
        "Content-type": "application/json"
    },
    validateStatus: status => status >= 200 && status < 500 
});

export async function register(args: RegisterArgs): Promise<SimplifiedUser | RegistrationFailureType> {
    const requestParameters = [
        `email=${args.email}`,
        `AUTH_KEY=${process.env.AUTH_KEY}`,
        `first_name=${args.firstName}`,
        `last_name=${args.lastName}`,
        `display_name=${args.firstName}%20${args.lastName}`
    ];

    const body = requestParameters.join('&');
    const response = await http.post(`/?rest_route=/simple-jwt-login/v1/users&${body}`);
    
    if(response.status != 200) {
        const errorCode = response?.data?.data?.errorCode;

        if(errorCode === 38)
        {
            return RegistrationFailureType.UserAlreadyExists;
        }
        
        console.log(response.data.data);

        return  RegistrationFailureType.Other;
    }

    return {
        wpJwtToken: response.data.jwt as string,
        id: response.data.id,
        email: response.data.user.user_email,
        username: response.data.user_user_login
    };
}

export async function authorize(credentials: Credentials): Promise<SimplifiedUser | UserAuthError> {
    if (!credentials) 
        return 'Unknown';
   
    const response = await http.post(`/?rest_route=/simple-jwt-login/v1/auth&email=${credentials.email}&password=${credentials.passwordBase64}`);
    
    if (!response.data.success || !response.data.data) {
        if(response.data?.data.errorCode === 48) {
            return 'WrongUserCredentials';
        } else {
            return 'Unknown';
        }
    }
    
    return { 
        ...jwt_decode(response.data.data.jwt),
        wpJwtToken: response.data.data.jwt
    } as SimplifiedUser;
}

export async function getUserInfoFromToken(jwtToken: string): Promise<User | UserAuthError |null> {
    const response = await http.post(`?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${jwtToken}`);
    
    if (!response.data.success) {
        if (response.data?.data?.errorCode === 24) {
            return 'UserNotFound'; 
        } else {
            return 'Unknown';
        }
    }

    const data = response.data.data;
    
    return { 
        email: data.user.user_email,
        wpJwtToken: response.data.data.jwt[0].token,
        id: data.user.ID,
        username: data.user.user_login,
        roles: data.roles,
        nickname: data.user.user_nicename,
        displayName: data.user.display_name,
    };
}

export async function refresh(token: string): Promise<string | null> {
    if (!token) return null;

    const response = await http.get(`/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=${token}`);

    if (!response.data.success || !response.data.data) {
        console.log(response.data);
        return null;
    }

    return response.data.data.jwt;
}

export async function revoke(token: string): Promise<boolean> {
    if (!token) return false;

    const response = await http.post(`/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT=${token}`);

    return response.data.success;
}

export type SimplifiedUser = {
    id: string;
    email: string;
    username: string;
    wpJwtToken: string;
}

export type User = SimplifiedUser & {
    roles: string[],
    nickname: string,
    displayName: string
}

export type Credentials = {
    email: string;
    passwordBase64: string;
}

export type RegisterArgs = {
    email: string;
    firstName: string;
    lastName: string;
}
  
export enum RegistrationFailureType 
{
    UserAlreadyExists,
    Other
}

export type NotRegisteredUser = {
    email: string,
    error: string
}

export type UserAuthError = 'UserNotFound' | 'WrongUserCredentials' | 'Unknown';
