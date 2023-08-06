"use client"

import { RegistrationForm } from '../components/auth/registration-form'
import React, { ComponentProps } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  token?: string;
}

export const Registration = ({ token }: Props) => {
  const router = useRouter()

  const handleRegistrationSuccess: ComponentProps<typeof RegistrationForm>['onSuccess'] = async () => {
    return router.push('/registration/location')
  }

  return (
    <RegistrationForm onSuccess={handleRegistrationSuccess} csrf={token} />
  )
}
