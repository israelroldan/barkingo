import { redirect } from "next/navigation"
import { getRandomDogBreeds, generateUniqueCode } from "../utils/dogBreedUtils"

const TOTAL_BREEDS = 9

export default function Home() {
  const newBreeds = getRandomDogBreeds(TOTAL_BREEDS)
  const cardId = generateUniqueCode(newBreeds)
  redirect(`/${cardId}`)
}

