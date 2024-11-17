import { Todo } from "../types/todo"

let todos: Todo[] = [
  {
    id: 1,
    title: 'Learn TypeScript',
    description: 'Learn TypeScript basics',
    completed: false,
  },
  {
    id: 2,
    title: 'Learn GraphQL',
    description: 'Learn GraphQL basics',
    completed: false,
  },
]

let idCounter = 3

export const todoResolvers = {
  Query: {
    getTodos: (): Todo[] => todos,
    getTodoById: (_: unknown, { id }: { id: number}): Todo | undefined => {      
      const todo = todos.find((todo) => todo.id === id)
      return todo
    }
  },
  Mutation: {
    addTodo: (_: unknown, { title, description }: { title: string, description?: string }) : Todo => {
      const newTodo: Todo = { id: idCounter++, title: title, description: description, completed: false }
      todos.push(newTodo)

      return newTodo
    },
    updateTodo: (
      _: unknown,
      { id, title, description, completed  }: { id: number; title?: string; description?: string; completed: boolean }
    ): Todo | undefined => {
      const todo = todos.find((todo) => todo.id === id)
      if (!todo) {
        throw new Error(`Todo with id ${id} was not found`)
      }
      if (title !== undefined) {
        todo.title = title
      }
      if (description !== undefined) {
        todo.description = description
      }
      if (completed !== undefined) {
        todo.completed = completed
      }

      return todo
    },
    deleteTodo: (_: unknown, { id }: { id: number }): string => {
      const index = todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        throw new Error(`Todo with id ${id} was not found`)
      }

      todos.splice(index, 1)

      return `Todo with id ${id} has been deleted`
    }
  }
}
