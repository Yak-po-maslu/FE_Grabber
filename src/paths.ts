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
  PROFILE: {
    profile: '/profile',
    edit: '/profile/edit',
    changePassword: '/profile/change-password',
  },
  PASSWORD: {
    forgot: '/forgot-password',
    reset: '/reset-password/:uid/:token',
  },
  ORDERS: '/orders',
  ADMIN: '/admin',
}

export const API_ENDPOINTS = {
  ADS: {
    create: 'ads/create/',
    moderation: 'ads/moderation/',
    addImage: 'ads/{ad_id}/add-image/',
    approve: 'ads/{ad_id}/approve/',
    reject: 'ads/{ad_id}/reject/',
    recommendations: '/ads/recommendations/',
  },
  AUTH: {
    login: 'user/login/',
    logout: 'user/logout/',
    register: 'user/register/',
    refreshToken: 'user/refresh/',
  },
  PASSWORD: {
    forgot: 'user/forgot-password/',
    reset: 'user/reset-password/',
    change: 'user/change-password/',
  },
  PROFILE: {
    get: 'user/profile/',
    patch: 'user/profile/',
    uploadProfilePhoto: 'user/upload-profile-image/',
    setNewPassword: 'user/reset-password/',
    deleteUser: 'user/delete/',
    deleteUserPhoto: 'user/delete-image-profile/',
  },
  ORDERS: {
    list: 'orders/',
  },
}
