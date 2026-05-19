import express from 'express'
import cors from 'cors'
import * as db from './queries.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
  response.json({ info: 'CrowdStrike Internship Task Manager API' })
})

app.get('/tasks', db.getTasks)
app.get('/tasks/:id', db.getTaskById)
app.post('/tasks', db.createTask)
app.put('/tasks/:id', db.updateTask)
app.delete('/tasks/:id', db.deleteTask)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})