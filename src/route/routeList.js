import { CategoryList, MainShop, ForgetPassword, Wishlist, ResetPassword, LocationPage, Home, ProductDetails, Signup, Login, Contact, Profile, Splash, Cart, CheckOut, Search, Order, Static, SocialLinks } from '../screens';
import DrawerNavigator from './drawer';

export const drawerRouteList = [
    { name: "home", component: Home },
    
    
    { name: 'location', component: LocationPage },
  
    { name: "signup", component: Signup },
    { name: "login", component: Login },
    { name: "profile", component: Profile },
    { name: "forgetPassword", component: ForgetPassword },
    { name: "resetPassword", component: ResetPassword },
    { name: "contact", component: Contact },
    { name: "cart", component: Cart },
    { name: "checkout", component: CheckOut },
  
    {name:"search", component:Search },
    {name:"wishlist", component:Wishlist},
    {name:"myOrder", component:Order},
    {name:'aboutUs', component:Static},
    {name:'franchisePartner', component:Static},
    {name:'productPartner', component:Static},
    {name:'twitter', component:SocialLinks},
    {name:'facebook', component:SocialLinks},
    {name:'instagram', component:SocialLinks},
    {name:'youtube', component:SocialLinks},
    { name: 'allCategories', component: CategoryList },
]

export const routeList=[
    { name: "splash", component: Splash },
    { name: 'mainShop', component: MainShop },
    { name: "productDetails", component: ProductDetails },
   
    {name:'drawer', component:DrawerNavigator}
]