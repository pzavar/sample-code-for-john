import axios from 'axios';


const baseURL="your_base_url will be here";
export const addressLocationKey='address_location_key will be here'

export const url = {

    //auth 
  signup: 'register_user',
  login:'login',
  sendEmailOtp: 'send_email_otp',
  sendPhoneOtp:'send_phone_otp',
  forgetPassword:'send_verification_otp',
  resetPassword:'reset_customer_pwd_by_id',

  //user
  getProfileById:'get_user_by_id',
  updateCustomerById:'update_customer_by_id',
  getCustomerAddress:'get_customer_address_by_id',
  addNewAddress:'post_customer_addresss',
  getMartCodeByLocation:'get_mart_location',

  //support
  contactUs:'contact_us', //not provided

  //home page apis
  getBrands:'get_brands',
  getSpecialProduct:'get_specialproduct',
  getHomeSlider:'get_slider_image',
  getFeaturedProducts:'hot_deals',
  getBestSeller:'get_best_seller_product', // notprovided
  // getShowCaseCategory:'get_showcase_categ',
  getShowCaseCategory:'get_showcase',


  //categories 
  getAllCategories:'get_all_categories', // main categories
  getAllCategoriesByParentId:'get_categories_by_parent_id', //sub categories
  getHomePageCategories:'get_home_category',

  //products
  getProductById:'get_product_by_id',    //
  searchProduct:'get_product_by_name_string',
  getProductByMultipleId:'get_product_by_multiple_id',
  getProductByCatgId:'get_product_by_categ_id',
  getProductByCatgIDAndMartCode:'get_product_by_categ',
   //wishlist
   addtoWishlisht:'add_wishlist_by_user_id',
   
   getAllWishlist:'get_wishlist_by_user_id',
   deleteWishListById:'delete_wislist_by_record_id',

  //order
  placeOrder:'create_orders',
  getMyOrders:'get_order_by_customer_id',
  getOrderDetailsByOrderId:'get_order_by_id',
  cancelMyOrder:'order_cancel',
  
};

export const httpRequest = axios.create({baseURL: baseURL});
