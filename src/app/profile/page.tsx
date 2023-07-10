"use client"

import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { useEffect, useState } from 'react'

// async function getData() {
//   const res = await fetch('https://api.example.com/...')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//
//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//
//   return res.json()
// }

async function getData() {
  const session = await getServerSession()
  return session;
}

export default function Profile() {
  const sess = useSession();
  const jwt = sess.data?.wpJwtToken;
  const [myData, setMyData] = useState<any>();

  useEffect(() => {
    const fetchMe = async () => {
      const me = await fetch('https://mingly.cz/wp-json/buddypress/v1/members/me', { headers: { Authorization: jwt } })
      setMyData(await me.json());
    }

    fetchMe();
  }, [jwt])

  return (
    <main className="w-full p-5">
      {myData && <>
        <img src={myData.avatar_urls.thumb}/>
        <p className="text-white text-lg">{myData.name}</p>
        <p className="text-white">{myData.user_login}</p>
      </>}
    </main>
  )
}
