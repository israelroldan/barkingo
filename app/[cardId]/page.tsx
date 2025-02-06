import { Suspense } from 'react'
import BingoGame from './BingoGame'

export default async function BingoPage({ params }: { params: { cardId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BingoGame initialCardId={params.cardId} />
    </Suspense>
  )
}
