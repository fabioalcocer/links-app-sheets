import Papa from 'papaparse'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type Link = {
  label: string
  url: string
}

async function getLinks() {
  const res = await fetch(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjUZebFwj89SiMeHNSCBCXOKci1bGNtL3VfQND2DeaB9vM0dCJr0rrVSiNMqStHAZJBifJpuVHXsTC/pub?gid=0&output=csv'
  )
  const data = await res.text()
  const dataParsed = await new Promise<Link[]>((resolve, reject) => {
    Papa.parse<Link>(data, {
      header: true,
      complete: (result) => resolve(result.data),
      error: reject,
    })
  })

  return dataParsed
}

export default async function Home() {
  const links = await getLinks()
  console.log(links)
  return (
    <main
      className={`text-zinc-100 grid place-content-center min-h-screen ${inter.className}`}
    >
      <h1 className='text-2xl font-semibold'>User1</h1>
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
