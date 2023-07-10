import React, { ReactNode } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

const LayoutProfile = ({ children }: { children: ReactNode }) => {
    let session = useSession();
    let email = session.data?.user?.email;
    return (
        <>
            {email
            ? <><p>{email}</p> <a onClick={() => signOut()}>Odhlásit</a></>
            : <p><a onClick={() => signIn()}>Přihlásit</a></p>}
            {children}
        </>
    )
}

export default LayoutProfile;
