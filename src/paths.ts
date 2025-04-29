export const PATHS = {
  HOME: '/',
  PRODUCTS: {
    list: '/products',
    details: '/products/:id',
    add: '/add-product',
  },
  CART: '/cart',
  AUTH: {
    login: '/login',
    register: '/register',
  },
  PASSWORD: {
    forgot: '/forgot-password',
    reset: '/reset-password/:uid/:token',
  },
  PROFILE: '/profile',
  ORDERS: '/orders',
  ADMIN: '/admin',
}

export const API_ENDPOINTS = {
  PRODUCTS: {
    list: '/api/products/',
    details: '/api/products/1/',
    add: '/api/products/',
  },
  AUTH: {
    login: '/api/login/',
    logout: '/api/logout/',
    register: '/api/register/',
    refreshToken: '/api/refresh/',
  },
  PASSWORD: {
    forgot: '/api/forgot-password/',
    reset: '/api/reset-password/',
  },
  PROFILE: {
    get: '/api/profile/',
  },
  ORDERS: {
    list: '/api/orders/',
  },
}
