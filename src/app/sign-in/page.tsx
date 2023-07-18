"use client"

import { signIn, getProviders, getCsrfToken } from 'next-auth/react'
import React, { useState } from 'react'
import { FormValues, LoginForm } from 'components/login-form'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'

export default function SignIn () {
  const [error, setError] = useState('');
  const router = useRouter();

  const providers = React.use(getProviders());
  const csrfToken = React.use(getCsrfToken());
  const handleSubmit: SubmitHandler<FormValues> = async ({ username, password }, event) => {
    event?.preventDefault();
    const r = await signIn('credentials', { username, password, csrfToken, redirect: false })

    if(r?.error) {
      return setError(r.error);
    }

    await router.push('/')
  }

  return (
    <>
      {error && <div className="p-2 text-red-400 font-bold">{error}</div>}
      <LoginForm onSubmit={handleSubmit} />
      {Object.entries(providers ?? {}).filter(([key]) => key !== 'credentials').map(([,provider]) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  );
}
