import dogBreeds from "./dogBreeds.json"

function isClient(): boolean {
  return typeof window !== 'undefined'
}

export function getRandomDogBreeds(count: number): any[] {
  const shuffled = [...dogBreeds].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function saveBreedsToLocalStorage(breeds: any[]): void {
  if (isClient()) {
    localStorage.setItem("dogBreeds", JSON.stringify(breeds))
  }
}

export function getBreedsFromLocalStorage(): any[] | null {
  if (isClient()) {
    const storedBreeds = localStorage.getItem("dogBreeds")
    return storedBreeds ? JSON.parse(storedBreeds) : null
  }
  return null
}

export function generateUniqueCode(breeds: any[]): string {
  return breeds.map((breed) => breed.id.toString(36)).join("-")
}

export function decodeBreedsFromCode(code: string): any[] {
  const ids = code.split("-").map((id) => Number.parseInt(id, 36))
  return ids.map((id) => dogBreeds.find((breed) => breed.id === id)).filter(Boolean)
}
