import { PageWrapper, PrivateRoute } from '../hoc'
import {
  AddProduct,
  Admin,
  Cart,
  ForgotPassword,
  Login,
  Orders,
  ProductDetails,
  Products,
  Profile,
  Register,
  ResetPassword,
  EditProfile,
  HomePage,
} from '../pages'
import { PATHS } from '../paths'
import ChangeUserPassword from '../pages/ChangeUserPassword'

export const routes = [
  {
    path: PATHS.HOME,
    element: <PageWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.PRODUCTS.list,
        element: <Products />,
      },
      {
        path: PATHS.PRODUCTS.details,
        element: <ProductDetails />,
      },
      {
        path: PATHS.PRODUCTS.add,
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: PATHS.AUTH.login,
        element: <Login />,
      },
      {
        path: PATHS.AUTH.register,
        element: <Register />,
      },
      {
        path: PATHS.PASSWORD.forgot,
        element: <ForgotPassword />,
      },
      {
        path: PATHS.PASSWORD.reset,
        element: <ResetPassword />,
      },

      {
        path: PATHS.CART,
        element: <Cart />,
      },
      {
        path: PATHS.ORDERS,
        element: <Orders />,
      },
      {
        path: PATHS.PROFILE.profile,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: PATHS.PROFILE.changePassword,
        element: (
          <PrivateRoute>
            <ChangeUserPassword />
          </PrivateRoute>
        ),
      },
      {
        path: PATHS.PROFILE.edit,
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: PATHS.ADMIN,
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
]
