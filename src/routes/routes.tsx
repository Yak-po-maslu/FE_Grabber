import { PageWrapper } from '../hoc'
import {
  AddProduct,
  Admin,
  Cart,
  ForgotPassword,
  Login,
  Main,
  Orders,
  ProductDetails,
  Products,
  Profile,
  Register,
  ResetPassword,
} from '../pages'
import { PATHS } from '../paths'

export const routes = [
  {
    path: PATHS.HOME,
    element: <PageWrapper />,
    children: [
      {
        index: true,
        element: <Main />,
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
        element: <AddProduct />,
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
        path: PATHS.PROFILE,
        element: <Profile />,
      },
      {
        path: PATHS.ADMIN,
        element: <Admin />,
      },
    ],
  },
]
