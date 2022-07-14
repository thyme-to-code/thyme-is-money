import request from 'superagent'

const rootUrl = '/api/v1/tasks'

export function getUninvoicedTasks(clientId) {
  return request.get(`${rootUrl}/${clientId}?status=uninvoiced`).then((res) => {
    return res.body
  })
}
