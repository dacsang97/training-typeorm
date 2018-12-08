import { Request, Response, NextFunction } from 'express'
import { getConnection, Repository } from 'typeorm'
import { validate } from 'class-validator'
import { Todo } from './entity/Todo'
import TodoRepository from './repository/TodoRepository'
import { TodoMetadata } from './entity/TodoMetadata'

let initialized = false
let repository: TodoRepository
let todoMetadataRepository: Repository<TodoMetadata>

const initialize = () => {
  initialized = true
  const connection = getConnection()
  repository = connection.getCustomRepository(TodoRepository)
  todoMetadataRepository = connection.getRepository(TodoMetadata)
}

export const createTodo = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!initialized) {
    initialize()
  }
  try {
    const todoMetadata = new TodoMetadata()
    todoMetadata.comment = 'Hello comment'
    const todo = new Todo()
    todo.name = 'A Todo'
    const errors = await validate(todo)
    if (errors.length > 0) {
      throw 400
    }
    todo.metadata = todoMetadata
    await todoMetadataRepository.save(todoMetadata)
    await repository.save(todo)
    res.send(todo)
  } catch (error) {
    if (error === 400) {
      res.status(400).send('Bad Request')
    } else {
      next(error)
    }
  }
}

export const readTodos = async (_: Request, res: Response) => {
  if (repository === undefined) {
    initialize()
  }
  const todos = await repository.find()
  res.send(todos)
}

export const readTodosIncomplete = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (repository === undefined) {
    initialize()
  }
  try {
    const todos = await repository.findIncomplete()
    res.send(todos)
  } catch (error) {
    next(error)
  }
}
