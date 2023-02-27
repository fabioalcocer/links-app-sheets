import { Inter } from 'next/font/google'
import Link from 'next/link'
import api from '@/api'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const users = await api.user.list()
  console.log(users)

  return (
    <main
      className={`text-zinc-100 grid place-content-center min-h-screen ${inter.className}`}
    >
      <ul>
        {users.map((user) => (
          <li key={user.url}>
            <Link href={`/${user.slug}`}>{user.slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
