import 'reflect-metadata'
import * as Express from 'express'
import { createConnection } from 'typeorm'
import { createTodo, readTodos } from './todosManager'

createConnection()
  .then(async () => {
    const app = Express()
    app.get('/create', createTodo)
    app.get('/read', readTodos)
    app.listen(3000, () => console.log('App listening on port 3000'))
  })
  .catch(error => console.log(error))
