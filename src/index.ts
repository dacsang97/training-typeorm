import 'reflect-metadata'
import * as Express from 'express'
import { createConnection } from 'typeorm'
import { Todo } from './entity/Todo'

createConnection()
  .then(async connection => {
    const app = Express()
    app.get('/create', async (_, res) => {
      const todo = new Todo()
      todo.name = 'A Todo'
      await connection.manager.save(todo)
      res.send(todo)
    })
    app.get('/read', async (_, res) => {
      const todos = await connection.manager.find(Todo)
      res.send(todos)
    })
    app.listen(3000, () => console.log('App listening on port 3000'))
  })
  .catch(error => console.log(error))
