import express from 'express'
import { buildSchema } from 'graphql'
import { ruruHTML } from 'ruru/server'
import { createHandler } from 'graphql-http/lib/use/express'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)


const rootValue = {
  hello: () => {
    return 'Hello, world!'
  },
}

const app = express()


const handler = createHandler({
  schema,
  rootValue,
})

app.all(
  '/graphql',
  handler
)

app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
