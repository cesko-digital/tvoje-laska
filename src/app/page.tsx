import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full p-5">
      <div className="text-2xl">mingly</div>
      <ul className="list-disc p-2">
        <li><Link href="/profile">My Profile</Link></li>
        <li><Link href="/kontakt">Wordpress link</Link></li>
      </ul>
    </main>
  )
}
