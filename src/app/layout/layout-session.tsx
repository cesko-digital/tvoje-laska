'use client'

import { SessionProvider } from "next-auth/react"
import LayoutProfile from "./layout-profile"
import { ReactNode } from 'react'

const LayoutSession = ({ children }: { children: ReactNode }) => {

    return (
       <SessionProvider>
            <LayoutProfile>{children}</LayoutProfile>
       </SessionProvider>
    )
}

export default LayoutSession;
