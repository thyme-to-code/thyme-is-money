import request from 'superagent'

const rootUrl = '/api/v1/tasks'

export function getUninvoicedTasks(clientId) {
  return request.get(`${rootUrl}/${clientId}?status=uninvoiced`).then((res) => {
    return res.body
  })
}

// /api/v1/tasks/add
export function addTask(task) {
  return request
    .post(`${rootUrl}/add`)
    .send(task)
    .then((res) => {
      return res.status
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
