import request from 'superagent'

const rootUrl = '/api/v1/tasks'

export function getUninvoicedTasks(clientId) {
  return request.get(rootUrl + '/' + clientId).then((res) => {
    console.log('apis/tasks' + res.body)
    return res.body
  })
}
