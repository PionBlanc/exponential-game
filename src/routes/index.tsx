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

function getBoxColor(digit: string): string {
  switch (digit) {
    case '1':
      return 'bg-red-500'
    case '2':
      return 'bg-yellow-500'
    case '3':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
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
  const gameStateStrReversed = gameStateStr.split('').reverse().join('')

  return (
    <div className="text-center min-h-screen bg-[#282c34] pb-32">
      <header className="flex flex-col items-center justify-center pt-8 text-white text-[calc(10px+2vmin)]">
        Exponential Game
        <div className="grid grid-cols-4 gap-2 mt-4">
          {Array.from({ length: 4 * 8 }).map((_, index) => {
            const digit = gameStateStrReversed[index] ?? '0'
            return (
              <div
                key={index}
                className={`w-16 h-16 ${getBoxColor(digit)} flex items-center justify-center text-2xl font-bold rounded`}
              >
                {digit}
              </div>
            )
          })}
        </div>
      </header>
      <button
        onClick={() => incrementGameState()}
        className="fixed bottom-0 left-0 right-0 w-full py-10 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 active:from-pink-700 active:via-purple-700 active:to-indigo-700 transition-all duration-200 shadow-lg touch-manipulation select-none"
      >
        Increment
      </button>
    </div>
  )
}
