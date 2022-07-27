// @ts-check
import request from 'superagent'
const rootUrl = '/api/v1/items'

// /api/v1/tasks/add
export function addTask(task) {
  return request
    .post(rootUrl)
    .send(task)
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log(err)
    })
}

// /api/v1/tasks/update/:id
export function updateTask(task) {
  return request
    .patch(rootUrl)
    .send(task)
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log(err)
    })
}

// /api/v1/tasks/delete/:id
export function deleteTask(id) {
  return request
    .del(rootUrl + '/' + id)
    .send()
    .then((res) => {
      return res.status
    })
    .catch((err) => {
      console.log(err)
    })
}
