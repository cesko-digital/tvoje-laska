export type LoggedUser = SimplifiedUser & {
    roles: string[],
    nickname: string,
    displayName: string
}

export type SimplifiedUser = {
    id: string;
    email: string;
    username: string;
    wpJwtToken: string;
}
export type NotRegisteredUser = {
  email: string,
  error: string
}