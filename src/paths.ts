export const PATHS = {
  HOME: '/',
  PRODUCTS: {
    list: '/products',
    details: '/ad/:ad_id',
    add: '/add-product',
    category: '/products/category/',
    favorites: '/favorites',
  },
  CART: '/cart',
  AUTH: {
    login: '/login',
    register: '/register',
  },
  PROFILE: {
    profile: '/profile',
    edit: '/profile/edit',
    change_email: '/profile/change-email',
    change_password: '/profile/change-password',
  },
  PASSWORD: {
    forgot: '/forgot-password',
    reset: '/reset-password/:uid/:token',
  },
  SOON: '/soon',
  ORDERS: '/orders',
  ADMIN: '/admin',
  FAQ: '/faq',
}

export const API_ENDPOINTS = {
  ADS: {
    create: 'listings/create/',
    details: 'listings/{ad_id}',
    getFavorites: '/listings/favorite/',
    popularProducts: '/listings/popular/',
    favorites: 'listings/favorites/',
    removeFavorite: 'listings/favorites/{product_id}/',
    moderation: 'listings/moderation/',
    addImage: 'ads/{ad_id}/add-image/',
    approve: 'listings/{ad_id}/approve/',
    reject: 'listings/{ad_id}/reject/',
    faq: 'listings/faq/',
    categoriesList: 'listings/categories/',
    recommendations: 'listings/recommendations/',
    rating: 'listings/products/{id}/reviews',
    comments: '/listings/products/{id}/comments/',
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
  EMAIL: {
    change: 'user/change-email/',
  },
  AD: {
    details: '/listings/{ad_id}/',
  },
  PROFILE: {
    get: 'user/profile/',
    patch: 'user/profile/',
    uploadProfilePhoto: 'user/upload-profile-image/',
    setNewPassword: 'user/reset-password/',
    deleteUser: 'user/delete/',
    deleteUserPhoto: 'user/delete-image-profile/',
  },
  SUBSCRIBE: '/subscribe/',
  ORDERS: {
    list: 'orders/',
  },
}
