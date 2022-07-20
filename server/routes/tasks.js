const express = require('express')
const router = express.Router()

const db = require('../db/tasks')

// GET /api/v1/tasks
router.get('/', (req, res) => {
  return db
    .getAllTasks()
    .then((tasks) => {
      res.json(tasks)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /api/v1/tasks/:client?status=
router.get('/:client', (req, res) => {
  const client = { id: Number(req.params.client), status: req.query.status }
  return db
    .getTasksByClient(client)
    .then((tasks) => {
      res.json(tasks)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// POST /api/v1/tasks/add
router.post('/add', (req, res) => {
  const task = req.body
  db.addTaskByClient(task)
    .then((task) => {
      res.json(task)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// DELETE /api/v1/tasks/delete/:id
router.delete('/delete/:id', (req, res) => {
  const id = Number(req.params.id)
  db.deleteTaskById(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// UPDATE /api/v1/tasks/update/:id

router.patch('/update/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedTask = req.body
  db.updateTaskById(updatedTask, id)
    .then((task) => {
      res.json(task)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
