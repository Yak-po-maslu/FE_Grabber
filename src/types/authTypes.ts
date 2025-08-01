export type TRegisterCredentialsRequest = {
  email: string
  password: string
}

export type TRegisterResponse = {}

export type TLoginCredentialsRequest = {
  email: string
  password: string
}

export type TLoginResponse = {
  message: string
}

export type TForgotPasswordRequest = {
  email: string
}

export type TChangePassword = {
  old_password: string
  new_password: string
  confirm_password: string
}

export type TChangePasswordRequest = {
  old_password: string
  new_password: string
}
