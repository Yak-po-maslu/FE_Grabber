import { routes } from './routes/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import userProfileStore, { initialState } from './store/userProfileStore'
import useFetchUserProfile from './api/useFetchUserProfile'
import { CustomToaster } from './components'

export default function App() {
  const routers = createBrowserRouter(routes)

  const userProfileInStore = userProfileStore.getState()

  const { data: userData, error, status } = useFetchUserProfile()

  useEffect(() => {
    if (status === 'pending') {
      userProfileInStore.setUserProfile({
        ...userProfileInStore,
        isLoggedIn: false,
        isLoading: true,
        isError: false,
      })
    } else if (userData) {
      userProfileInStore.setUserProfile({
        userInfo: userData,
        isLoggedIn: true,
        isLoading: false,
        isError: false,
      })
    } else if (error) {
      userProfileInStore.setUserProfile({
        ...initialState,
        isLoggedIn: false,
        isLoading: false,
        isError: true,
      })
    }
  }, [status, userData, error, userProfileInStore])

  return (
    <>
      <RouterProvider router={routers} />
      <CustomToaster />
    </>
  )
}
