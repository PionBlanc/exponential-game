import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  state: defineTable({
    gamestatestr: v.string(),
    gameState: v.int64(),
  }),
})
