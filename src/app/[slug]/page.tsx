import api from '@/api'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function Slug({ params: { slug } }: Props) {
  const users = await api.user.list()
  const user = users.find((user) => user.slug === slug)

  if (!user) {
    return notFound()
  }

  const links = await api.links.fetch(user.url)
  console.log(links)

  return (
    <main className='text-zinc-100 grid place-content-center min-h-screen'>
      <h1 className='text-2xl font-semibold'>{slug}</h1>
      <ul>
        {links.map((link) => (
          <li key={link.url}>
            <a target='_blank' rel='noreferrer' href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
