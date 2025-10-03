import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prism — AI Portfolio Intelligence',
  description: 'Analyze. Learn. Play. Grow.',
  keywords: 'portfolio, analytics, AI, crypto, stocks, investment, finance',
  authors: [{ name: 'Prism Team' }],
  creator: 'Prism',
  publisher: 'Prism',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prism.app',
    title: 'Prism — AI Portfolio Intelligence',
    description: 'Analyze. Learn. Play. Grow.',
    siteName: 'Prism',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Prism Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prism — AI Portfolio Intelligence',
    description: 'Analyze. Learn. Play. Grow.',
    creator: '@prism_app',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <div className="md:pl-64">
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <Toaster 
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                  },
                }}
              />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
