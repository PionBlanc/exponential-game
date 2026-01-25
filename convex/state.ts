import { query } from './_generated/server'

export const getGameState = query({
  args: {},
  handler: async (ctx) => {
    const gameState = await ctx.db.query('state').first()
    return gameState?.gameState
  },
})
