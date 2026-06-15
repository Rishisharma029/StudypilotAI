import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'StudyPilot AI — Your Ultimate AI Study Companion',
    template: '%s | StudyPilot AI',
  },
  description: 'StudyPilot AI is a premium AI-powered student productivity platform with notes, flashcards, quizzes, AI tutor, study planner, and more. Ace your exams with intelligent study tools.',
  keywords: ['AI study tool', 'student productivity', 'flashcards', 'notes', 'quiz generator', 'AI tutor', 'JEE preparation', 'NEET preparation', 'study planner'],
  authors: [{ name: 'StudyPilot AI' }],
  creator: 'StudyPilot AI',
  metadataBase: new URL('https://studypilot.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studypilot.ai',
    title: 'StudyPilot AI — Your Ultimate AI Study Companion',
    description: 'Premium AI-powered student productivity platform',
    siteName: 'StudyPilot AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyPilot AI',
    description: 'Your Ultimate AI Study Companion',
    creator: '@studypilotai',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
