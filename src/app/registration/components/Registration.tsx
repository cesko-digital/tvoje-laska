"use client"

import { RegistrationForm } from './RegistrationForm'
import React, { ComponentProps } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  token?: string;
}

export const RegistrationWizard = ({ token }: Props) => {
  const router = useRouter()

  const handleRegistrationSuccess: ComponentProps<typeof RegistrationForm>['onSuccess'] = async () => {
    return router.push('/registration/location')
  }

  return (
    <RegistrationForm onSuccess={handleRegistrationSuccess} csrf={token} />
  )
}
