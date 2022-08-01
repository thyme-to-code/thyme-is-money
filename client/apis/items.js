import request from 'superagent'
const rootUrl = '/api/v1/items'

export function getItems(query) {
  return request
    .get(rootUrl + query)
    .then((res) => res.body.json())
    .catch((err) => console.log(err))
}
