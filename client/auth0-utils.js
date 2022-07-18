import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from './reducers/user'

export const cacheUser = async (useAuth0) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0
  const token = await getAccessTokenSilently()

  if (isAuthenticated && !loggedInUser?.token) {
    try {
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token: token,
      }
      dispatch(setLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}
