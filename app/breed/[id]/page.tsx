import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import dogBreeds from "../../../utils/dogBreeds.json"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BreedInfoPage({ params }: PageProps) {
  const { id } = await params
  const breed = dogBreeds.find((breed) => breed.id === Number.parseInt(id))

  if (!breed) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6 text-center">{breed.name}</h1>
      <div className="mb-6 relative aspect-video rounded-xl overflow-hidden shadow-lg">
        <Image src={breed.image.url || "/placeholder.svg"} alt={breed.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <p>
          <strong>Breed Group:</strong> {breed.breed_group || "Not specified"}
        </p>
        <p>
          <strong>Temperament:</strong> {breed.temperament || "Not specified"}
        </p>
        <p>
          <strong>Life Span:</strong> {breed.life_span}
        </p>
        <p>
          <strong>Bred For:</strong> {breed.bred_for || "Not specified"}
        </p>
        <p>
          <strong>Origin:</strong> {breed.origin || "Not specified"}
        </p>
        <p>
          <strong>Weight:</strong> {breed.weight.metric} kg
        </p>
        <p>
          <strong>Height:</strong> {breed.height.metric} cm
        </p>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Barkingo Game
        </Link>
      </div>
    </div>
  )
}

