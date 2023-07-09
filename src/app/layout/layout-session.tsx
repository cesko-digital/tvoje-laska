'use client'

import { SessionProvider } from "next-auth/react"
import LayoutProfile from "./layout-profile"

const LayoutSession = () => {
    
    return (
       <SessionProvider>
            <LayoutProfile></LayoutProfile>
       </SessionProvider>
    )
}

export default LayoutSession;