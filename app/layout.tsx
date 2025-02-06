import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🐾 Barkingo! - The Pawsome Dog Breed Bingo Game",
  description:
    "Woof you believe it? Play Barkingo and become the ultimate dog breed detective! Spot breeds, score points, and fetch that win!",
  openGraph: {
    title: "🐾 Barkingo! - Unleash Your Inner Dog Expert",
    description:
      "Tail-wagging fun awaits! Can you sniff out all the dog breeds? Play Barkingo now and become the top dog!",
    images: [
      {
        url: "https://example.com/barkingo-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Barkingo - Dog Breed Bingo Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🐾 Barkingo! - The Ulti-mutt Dog Breed Game",
    description: "Howl you like to play the most paw-some dog breed bingo? Barkingo is here to make your tail wag!",
    images: ["https://example.com/barkingo-twitter-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

