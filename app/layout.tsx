import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Footer } from 'components/footer';

const hubot = localFont({
  src: '../public/fonts/Hubot-Sans.woff2',
  variable: '--font-hubot',
})

export const metadata: Metadata = {
  title: 'Blog | Sara Martínez',
  description: 'Web Developer',
  openGraph: {
    title: 'Sara Martínez',
    description: 'Desenvolupadora Web',
    url: 'https://smartido.dev',
    siteName: 'Sara Martínez',
    locale: 'ca_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Sara Martínez',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html
      lang='ca'
      className={`antialiased ${hubot.variable}`}
      suppressHydrationWarning={true}
    >
      <body className='max-w-2xl m-auto'>
        <main className='min-h-screen px-4 pb-6 pt-48'>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}
