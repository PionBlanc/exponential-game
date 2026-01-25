import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const gameState = useQuery(api.state.getGameState)
  const incrementGameState = useMutation(api.state.incrementGameState)
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        Hello World
        <p>{gameState}</p>
        <button onClick={() => incrementGameState()}>Increment</button>
      </header>
    </div>
  )
}
