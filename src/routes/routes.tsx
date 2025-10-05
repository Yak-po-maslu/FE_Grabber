import { PageWrapper, PrivateRoute } from '../hoc'
import {
  AddListing,
  Admin,
  Cart,
  ForgotPassword,
  Orders,
  AdDetails,
  Products,
  Profile,
  ResetPassword,
  EditProfile,
  Main,
  ChangeUserEmail,
  ComingSoon,
  Favorites,
  LoginRegister,
} from '../pages'
import { PATHS } from '../paths'
import ChangeUserPassword from '../pages/ChangeUserPassword'
import { FAQSection, LoginForm, RegisterForm } from '../components'

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
        path: PATHS.FAQ,
        element: <FAQSection />,
      },
      {
        path: PATHS.PRODUCTS.list,
        element: <Products />,
      },
      {
        path: `${PATHS.PRODUCTS.category}:category`,
        element: <Products />,
      },
      {
        path: PATHS.PRODUCTS.details,
        element: <AdDetails />,
      },
      {
        path: PATHS.PRODUCTS.add,
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: PATHS.PRODUCTS.favorites,
        element: <Favorites />,
      },
      {
        path: PATHS.AUTH.login,
        element: (
          <LoginRegister title="Увійти в акаунт">
            <LoginForm />
          </LoginRegister>
        ),
      },
      {
        path: PATHS.AUTH.register,
        element: (
          <LoginRegister title="Реєстрація">
            <RegisterForm />
          </LoginRegister>
        ),
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
        path: PATHS.SOON,
        element: <ComingSoon />,
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
        path: PATHS.PROFILE.change_password,
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
        path: PATHS.PROFILE.change_email,
        element: (
          <PrivateRoute>
            <ChangeUserEmail />
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
