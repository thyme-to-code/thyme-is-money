import request from 'superagent'

const rootUrl = '/api/v1/clients'

export function getAllClients() {
  return request.get(rootUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}
