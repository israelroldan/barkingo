import { Suspense } from "react"
import BingoGame from "./BingoGame"

interface PageProps {
  params: Promise<{ cardId: string }>
}

export default async function BingoPage({ params }: PageProps) {
  const { cardId } = await params

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BingoGame initialCardId={cardId} />
    </Suspense>
  )
}

