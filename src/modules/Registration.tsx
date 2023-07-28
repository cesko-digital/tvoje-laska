"use client"

import { RegistrationForm } from '../components/auth/registration-form'
import { ComponentProps, useState } from 'react'

type Step = 'REGISTER' | 'NAME'


export const Registration = () => {
  const [step, setStep] = useState<Step>("REGISTER")
  // todo: could be local storage
  const [jwt, setJWT] = useState<string>();

  const handleRegistrationSuccess: ComponentProps<typeof RegistrationForm>['onSuccess'] = ({ jwt }) => {
    setJWT(jwt);
    setStep('NAME');
  }


  if(jwt) {
    if(step === 'NAME') {
      return <div>enter your name</div>
    }
  }

  return <RegistrationForm onSuccess={handleRegistrationSuccess} />
}
