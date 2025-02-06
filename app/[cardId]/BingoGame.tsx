"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCw, Share2 } from "lucide-react"
import Image from "next/image"
import {
  getRandomDogBreeds,
  saveBreedsToLocalStorage,
  generateUniqueCode,
  decodeBreedsFromCode,
  getBreedsFromLocalStorage,
} from "../../utils/dogBreedUtils"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useLongPress } from "../../hooks/useLongPress"

const Confetti = dynamic(() => import("../Confetti"), { ssr: false })

const GRID_SIZE = 3
const TOTAL_BREEDS = GRID_SIZE * GRID_SIZE

interface DogBreed {
  id: number
  name: string
  image: {
    url: string
  }
}

interface BingoGameProps {
  initialCardId: string
}

export default function BingoGame({ initialCardId }: BingoGameProps) {
  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>([])
  const [selectedBreeds, setSelectedBreeds] = useState<Set<number>>(new Set())
  const [bingo, setBingo] = useState(false)
  const [uniqueCode, setUniqueCode] = useState<string>(initialCardId)
  const router = useRouter()

  const checkBingo = useCallback(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    const hasBingo = lines.some((line) => line.every((i) => selectedBreeds.has(i)))
    setBingo(hasBingo)
  }, [selectedBreeds])

  const getNewBreeds = useCallback(() => {
    if (selectedBreeds.size > 0) {
      const confirmNewGame = window.confirm(
        "Starting a new game will lose your current progress. Are you sure you want to continue?",
      )
      if (!confirmNewGame) return
    }

    const newBreeds = getRandomDogBreeds(TOTAL_BREEDS)
    setDogBreeds(newBreeds)
    saveBreedsToLocalStorage(newBreeds)
    setSelectedBreeds(new Set())
    setBingo(false)
    const newCode = generateUniqueCode(newBreeds)
    setUniqueCode(newCode)
    router.push(`/${newCode}`)
  }, [selectedBreeds, router])

  useEffect(() => {
    const storedBreeds = getBreedsFromLocalStorage()
    if (storedBreeds && storedBreeds.length === TOTAL_BREEDS) {
      setDogBreeds(storedBreeds)
    } else {
      const decodedBreeds = decodeBreedsFromCode(initialCardId)
      if (decodedBreeds.length === TOTAL_BREEDS) {
        setDogBreeds(decodedBreeds)
        saveBreedsToLocalStorage(decodedBreeds)
      } else {
        getNewBreeds()
      }
    }
  }, [initialCardId, getNewBreeds])

  useEffect(() => {
    checkBingo()
  }, [checkBingo])

  const toggleBreed = useCallback((index: number) => {
    setSelectedBreeds((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(index)) {
        newSelected.delete(index)
      } else {
        newSelected.add(index)
      }
      return newSelected
    })
  }, [])

  const handleLongPress = useCallback(
    (index: number) => {
      const breed = dogBreeds[index]
      router.push(`/breed/${breed.id}`)
    },
    [dogBreeds, router],
  )

  const longPressEvents = useLongPress(handleLongPress, toggleBreed, {
    shouldPreventDefault: true,
    delay: 500,
  })

  const getEncouragingMessage = (count: number) => {
    if (count === 0) return "Let's start spotting some dogs!"
    if (count < 3) return "Great start! Keep your eyes peeled!"
    if (count < 6) return "Wow! You're a regular dog whisperer!"
    if (count < 8) return "Incredible! You're the talk of the dog park!"
    return "You're the ultimate dog breed expert!"
  }

  const shareCard = () => {
    const shareUrl = `${window.location.origin}/${uniqueCode}`
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        alert("Share link copied to clipboard!")
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md min-h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center">🐾 Barkingo! 🐾</h1>
      {bingo && (
        <>
          <Confetti />
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-700 text-center rounded-md animate-pulse">
            <h2 className="text-2xl">🎉 Bingo! You&apos;re the top dog! 🏆</h2>
          </div>
        </>
      )}
      <div className="grid grid-cols-3 gap-2 mb-4 aspect-square">
        {dogBreeds.map((breed, index) => {
          const events = longPressEvents(index)
          return (
            <div
              key={breed.id}
              {...events}
              className={`cursor-pointer relative aspect-square rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-105 ${
                selectedBreeds.has(index) ? "ring-4 ring-blue-500" : ""
              }`}
            >
              <Image
                src={breed.image.url || "/placeholder.svg"}
                alt={breed.name}
                fill
                sizes="(max-width: 768px) 33vw, 20vw"
                className="object-cover select-none"
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pointer-events-none">
                <span className="text-white font-medium text-sm select-none">{breed.name}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="h-20">
        <p className="text-center text-lg font-semibold">{getEncouragingMessage(selectedBreeds.size)}</p>
        <p className="mt-2 text-center text-base">
          You&apos;ve spotted {selectedBreeds.size} out of {TOTAL_BREEDS} breeds!
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={getNewBreeds}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="New Barkingo Card"
        >
          <RefreshCw size={24} />
        </button>
        <button
          onClick={shareCard}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Share Card"
        >
          <Share2 size={24} />
        </button>
      </div>
    </div>
  )
}

