const express = require('express')
const router = express.Router()

const { getClients, addClient, updateClient } = require('../db/clients')

router.get('/', (req, res) => {
  getClients()
    .then((clients) => {
      res.json(clients)
    })
    .catch((err) => {
      console.error(err)
      throw new Error('Failed to fetch clients')
    })
})

module.exports = router
