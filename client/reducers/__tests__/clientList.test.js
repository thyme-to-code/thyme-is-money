import clientList, {
  setSelectedClient,
  clearSelectedClient,
} from '../clientList'

describe('clientList reducers', () => {
  it('sets the selected client into state', () => {
    const oldState = {}
    const action = setSelectedClient({
      business_name: 'Mickey Mouse Clubhouse',
    })
    const newState = clientList(oldState, action)
    expect(newState.selectedClient).toEqual(action.payload)
  })
  it('clears the selected client', () => {
    const oldState = {
      business_name: 'Mickey Mouse Clubhouse',
    }
    const action = clearSelectedClient(oldState)
    const newState = clientList(oldState, action)
    expect(newState.selectedClient).toEqual({})
  })
})
