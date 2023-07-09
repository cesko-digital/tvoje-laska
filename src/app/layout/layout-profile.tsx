'use client'

import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"

const LayoutProfile = () => {
    let session = useSession();
    let email = session.data?.user?.email;
    return (
        <>
            {email
            ? <><p>{email}</p> <a onClick={() => signOut()}>Odhlásit</a></>
            : <p><a onClick={() => signIn()}>Přihlásit</a></p>}
        </>
    )
}

export default LayoutProfile;