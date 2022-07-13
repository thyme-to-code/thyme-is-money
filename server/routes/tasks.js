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

module.exports = router
