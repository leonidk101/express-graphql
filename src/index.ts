import path from 'path'
import { readFileSync } from 'fs'

import express from 'express'

import { createHandler } from 'graphql-http/lib/use/express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ruruHTML } from 'ruru/server'

import { resolvers } from './resolvers'

const typeDefs = readFileSync(path.join(__dirname, './schemas/todo/todoTypes.gql'), 'utf8')

const app = express()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const handler = createHandler({
  schema
})

app.all(
  '/graphql',
  handler
)

app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

const PORT = process.env.APP_PORT ?? 4000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
