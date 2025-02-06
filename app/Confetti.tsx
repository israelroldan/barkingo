import type React from "react"

const Confetti: React.FC = () => {
  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ["#FFD700", "#FFA500", "#FF69B4", "#00CED1", "#32CD32"][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

