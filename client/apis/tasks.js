import request from 'superagent'
const rootUrl = '/api/v1/tasks'

// /api/v1/tasks/add
export function addTask(task) {
  return request
    .post(`${rootUrl}/add`)
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
    .patch(`${rootUrl}/update/${task.id}`)
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
    .del(`${rootUrl}/delete/${id}`)
    .send()
    .then((res) => {
      return res.status
    })
    .catch((err) => {
      console.log(err)
    })
}
