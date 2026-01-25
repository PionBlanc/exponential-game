import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'

export const Route = createFileRoute('/')({
  component: App,
})

function toBase4(value: bigint | null | undefined): string {
  if (value === undefined || value === null) return '0'
  if (value === BigInt(0)) return '0'

  let result = ''
  let remaining = value
  const base = BigInt(4)

  while (remaining > BigInt(0)) {
    result = (remaining % base).toString() + result
    remaining = remaining / base
  }

  return result
}

function App() {
  const gameState = useQuery(api.state.getGameState)
  const incrementGameState = useMutation(
    api.state.incrementGameState,
  ).withOptimisticUpdate((localStore) => {
    const currentValue = localStore.getQuery(api.state.getGameState)
    if (currentValue) {
      localStore.setQuery(api.state.getGameState, {}, currentValue + BigInt(1))
    }
  })
  const gameStateStr = toBase4(gameState)
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        Hello World
        <p>{gameStateStr}</p>
        <button onClick={() => incrementGameState()}>Increment</button>
      </header>
    </div>
  )
}
