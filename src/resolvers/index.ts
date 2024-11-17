import { todoResolvers } from './todoResolvers'

export const resolvers = {
  Query: {
    ...todoResolvers.Query
  },
  Mutation: {
    ...todoResolvers.Mutation
  }
}
