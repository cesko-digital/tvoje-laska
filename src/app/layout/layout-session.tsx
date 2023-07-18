'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react'
import LayoutNavigation from 'app/layout/layout-navigation'

const LayoutSession = ({ children }: { children: ReactNode }) => {
    return (
       <SessionProvider>
            <LayoutNavigation>{children}</LayoutNavigation>
       </SessionProvider>
    )
}

export default LayoutSession;
