import request from 'superagent'

const rootUrl = '/api/v1/tasks'

export function getUninvoicedTasks(clientId) {
  return request.get().then((res) => {
    // console.log(res.body)
    return res.body
  })
}
