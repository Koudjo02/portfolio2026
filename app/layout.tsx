import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import FloatingParticles from '../components/FloatingParticles'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Samuel Adzogble | Développeur Fullstack',
  description: 'Portfolio d\'Adzogble koudjo samuel, développeur fullstack spécialisé en React, Next.js. Découvrez mes projets et compétences.',
icons: {
  icon: '/mon-icône.jpg',
  apple: '/apple-icon.png',
},

}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <FloatingParticles />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}