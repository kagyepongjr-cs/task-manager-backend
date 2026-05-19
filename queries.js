import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
})

const getTasks = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM tasks ORDER BY id ASC')
    response.status(200).json(results.rows)
  } catch (error) { throw error }
}

const getTaskById = async (request, response) => {
  const id = parseInt(request.params.id, 10)
  try {
    const results = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    response.status(200).json(results.rows)
  } catch (error) { throw error }
}

const createTask = async (request, response) => {
    const { title, description, priority, status, due_date, category } = request.body
    const dueDateValue = due_date === '' ? null : due_date
    try {
      await pool.query(
        'INSERT INTO tasks (title, description, priority, status, due_date, category) VALUES ($1, $2, $3, $4, $5, $6)',
        [title, description, priority, status, dueDateValue, category]
      )
      response.status(201).send('Task created')
    } catch (error) { throw error }
  }

const updateTask = async (request, response) => {
  const id = parseInt(request.params.id, 10)
  const { title, description, priority, status, due_date, category } = request.body
  try {
    await pool.query(
      'UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, due_date = $5, category = $6 WHERE id = $7',
      [title, description, priority, status, due_date, category, id]
    )
    response.status(200).send(`Task modified with ID: ${id}`)
  } catch (error) { throw error }
}

const deleteTask = async (request, response) => {
  const id = parseInt(request.params.id, 10)
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    response.status(200).send(`Task deleted with ID: ${id}`)
  } catch (error) { throw error }
}

export { getTasks, getTaskById, createTask, updateTask, deleteTask }