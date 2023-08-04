"use client"

import { RegistrationForm } from '../components/auth/registration-form'
import React, { ComponentProps } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const Registration = () => {
  const router = useRouter()

  const handleRegistrationSuccess: ComponentProps<typeof RegistrationForm>['onSuccess'] = async ({ jwt }) => {
    toast.success('Registrace proběhla úspěšně, můžete se přihlásit.')
    router.push('/auth/sign-in')
  }

  return <RegistrationForm onSuccess={handleRegistrationSuccess} />
}
