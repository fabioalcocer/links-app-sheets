import './globals.css'

export const metadata = {
  title: 'Linktree Clone',
  description: 'Linktree clone using Google Sheets as backend',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body>
        <div className='min-h-screen bg-zinc-900'>{children}</div>
      </body>
    </html>
  )
}
