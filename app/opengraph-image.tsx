import { ImageResponse } from 'next/og'

export const runtime = "edge"

export const alt = "Barkingo - The Pawsome Dog Breed Bingo Game"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #FFD700, #FFA500)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: "#1E3A8A",
          marginBottom: 20,
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        🐾 Barkingo! 🐾
      </h1>
      <p
        style={{
          fontSize: 40,
          color: "#2563EB",
          marginBottom: 40,
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        The Pawsome Dog Breed Bingo Game
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["🐶", "🦮", "🐕‍🦺", "🐩"].map((emoji, index) => (
          <span
            key={index}
            style={{
              fontSize: 100,
              margin: "0 20px",
              filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))",
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>,
    {
      ...size,
    },
  )
}

