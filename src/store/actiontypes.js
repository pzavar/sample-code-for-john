const manageActionType = type => {
  return {
    start: type + '_Start',
    success: type + '_Success',
    failed: type + '_Failed',
  };
};

export const types = {
  // ==================== AUTH ======================//
   
  //signup
  SIGNUP: manageActionType('SIGNUP'), 
  //login save id and token
  LOGIN: manageActionType('LOGIN'),
  LOGOUT:manageActionType('LOGOUT'),
  // to save reset verification code in reducer
  FORGET_PASSSWORD: manageActionType('FORGET_PASSSWORD'),
  // to save email verification code in reducer
  SEND_EMAIL_OTP: manageActionType('SEND_EMAIL_OTP'),
  // to save  phone verification code in reducer
  SEND_PHONE_OTP: manageActionType('SEND_PHONE_OTP'),
  //clear verification code from reducer
  RESET_PASSWORD: manageActionType('RESET_PASSWORD'),
  VERIFY_EMAIL_OTP: manageActionType('VERIFY_EMAIL_OTP'),
  VERIFY_PHONE_OTP: manageActionType('VERIFY_PHONE_OTP'),

  // ==================== HOME PAGE ======================//

  GET_BRANDS: manageActionType('GET_BRANDS'),
  GET_SPECIAL_PRODUCT: manageActionType('GET_SPECIAL_PRODUCT:'),
  GET_GET_HOME_SLIDER: manageActionType('GET_GET_HOME_SLIDER'),
  GET_FEATURED_PRODUCT: manageActionType('GET_FEATURED_PRODUCT'),
  GET_BEST_SELLER: manageActionType('GET_BEST_SELLER'),

  // ==================== PRODUCT AND CATG ==================//

  GET_ALL_CATEGORIES: manageActionType('GET_ALL_CATEGORIES'),
  GET_SUB_CATG: manageActionType('GET_SUB_CATG'),
  GET_HOME_PAGE_CATG: manageActionType('GET_HOME_PAGE_CATG'),
  GET_SHOWCASE_CATG: manageActionType('GET_SHOWCASE_CATG'),
  GET_PRODUCT_BY_ID: manageActionType('GET_PRODUCT_BY_ID'),
  GET_PRODUCT_BY_SUBCATG: manageActionType('GET_PRODUCT_BY_SUBCATG'),
  SEARCH_PRODUCT: manageActionType('SEARCH_PRODUCT'),

  // ==================== ORDER ======================//
  PLACE_ORDER: manageActionType('PLACE_ORDER'),
  GET_MY_ORDERS: manageActionType('GET_MY_ORDERS'),
  CANCEL_ORDER: manageActionType('CANCEL_ORDER'),

  // ==================== CART ======================//

  UPDATE_CART: manageActionType('UPDATE_CART'), // add, update cart .. get cart through reducer
  REMOVE_CART: manageActionType('REMOVE_CART'),

  // ==================== WISHLIST ======================//

  ADD_WISHLIST: manageActionType('ADD_WISHLIST'),
  GET_WISHLIST: manageActionType('GET_WISHLIST'),
  REMOVE_WISHLIST: manageActionType('REMOVE_WISHLIST'),

  // ==================== USER && ADDRESS ======================//
  GET_PROFILE_BY_ID: manageActionType('GET_PROFILE_BY_ID:'),
  UPDATE_PROFILE_BY_ID: manageActionType('UPDATE_PROFILE_BY_ID'),
  
  GET_USER_ADDRESS: manageActionType('GET_USER_ADDRESS'),
  ADD_USER_ADDRESS: manageActionType('ADD_USER_ADDRESS'),
  GET_ADDRESS_FROM_CORDS: manageActionType('GET_ADDRESS_FROM_CORDS'),
  GET_MART_LOCATION: manageActionType('GET_MART_LOCATION'),
  SELECTED_ADDRESS: manageActionType('SELECTED_ADDRESS'),
  ADD_LOCAL_ADDRESS:manageActionType('ADD_LOCAL_ADDRESS'),
  

  // ==================== SUPPORT ======================//
  CONTACT: manageActionType('CONTACT'),

  UPDATE_PROFILE_BY_ID: manageActionType('UPDATE_PROFILE_BY_ID'),


  // ==================== TOASt ======================//
  SHOW_TOAST :manageActionType('SHOW_TOAST'),
  HIDE_TOAST: manageActionType('HIDE_TOAST')
};
