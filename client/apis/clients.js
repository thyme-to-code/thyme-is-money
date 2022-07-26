import request from 'superagent'

const rootUrl = '/api/v1/clients'

export function getClients(filter) {
  return request.get(rootUrl + '?filter=' + filter).then((res) => {
    return res.body
  })
}

getClients('active')
