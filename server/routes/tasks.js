const express = require('express')
const router = express.Router()

const db = require('../db/tasks')

// GET /api/tasks
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

// GET /api/tasks/:client?status=
router.get('/:client', (req, res) => {
  const client = { id: Number(req.params.client), status: req.query.status }
  return db
    .getUninvoicedTasksByClient(client)
    .then((uninvoicedTasks) => {
      res.json(uninvoicedTasks)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// POST /api/tasks/add
router.post('/add', (req, res) => {
  const task = req.body
  db.addTaskByClient(task)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
