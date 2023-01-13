// @ts-check
import { useAppDispatch, useAppSelector } from './reducers/hooks'
import { setLoggedInUser } from './reducers/user'

export const cacheUser = async (useAuth0) => {
  const dispatch = useAppDispatch()
  const loggedInUser = useAppSelector((state) => state.user)
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0()

  if (isAuthenticated && !loggedInUser?.token) {
    try {
      const token = await getAccessTokenSilently()
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token: token,
      }
      localStorage.setItem('token', token)
      dispatch(setLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}
