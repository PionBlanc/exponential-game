import { mutation, query } from './_generated/server'

export const getGameState = query({
  args: {},
  handler: async (ctx) => {
    const gameState = await ctx.db.query('state').first()
    return gameState?.gameState
  },
})

export const incrementGameState = mutation({
  args: {},
  handler: async (ctx) => {
    const gameState = await ctx.db.query('state').first()
    if (!gameState) {
      await ctx.db.insert('state', { gameState: BigInt(0) })
    } else {
      await ctx.db.patch(gameState._id, {
        gameState: gameState.gameState + BigInt(1),
      })
    }
  },
})
