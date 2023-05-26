import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { themeEffect } from './theme-effect';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Sara Martínez's blog",
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Sara Martínez's blog",
    description: 'Developer, writer, and creator.',
    url: "https://saramd.cat", //TODO
    siteName: "Sara Martínez's blog",
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
  icons: {
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ca"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-white max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />

          {children}
        </main>
        
        {/* <Footer /> */}
      </body>
    </html>
  )
}
