/**
 * @jest-environment jsdom
 */
import user, { setLoggedInUser, clearLoggedInUser } from '../user'

describe('user reducers', () => {
  it('sets logged in user data in state', () => {
    const oldState = {
      auth0Id: '',
      email: '',
      token: '',
    }
    const action = setLoggedInUser({
      auth0Id: '626',
      email: 'stitch@ohana.com',
      token: localStorage.getItem('token'),
    })
    const newState = user(oldState, action)
    expect(newState.token).toEqual(action.payload.token)
  })
  it('clears user data from state', () => {
    const oldState = {
      email: 'lilo@ohana.com',
    }
    const action = clearLoggedInUser()
    const newState = user(oldState, action)
    expect(newState.email).toBe('')
  })
})
