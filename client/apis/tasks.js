import request from 'superagent'

const rootUrl = '/api/v1/tasks'

export function getUninvoicedTasks(clientId) {
  return request.get(`${rootUrl}/${clientId}?status=uninvoiced`).then((res) => {
    console.log('apis/tasks' + res.body)
    return res.body
  })
}
