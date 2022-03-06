import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  BackHandler,
  View,
  ScrollView,
} from 'react-native';

import Slider1 from '../../components/sliders/slider1';
import { COLORS, hp,ICONS, IMAGES, getFont, wp } from '../../constants';
import Header from '../../components/layout/header'
import { connect } from 'react-redux'
import { getProductById, addToCart, removeFromCart, getRelatedProduct,   addtoWishlist,  deleteWishListById } from '../../store/actions';
import ProductCard from '../../components/card/productCard'
import { useRoute, useNavigation, useNavigationState } from '@react-navigation/native';


const ProductDetails = props => {
  const [activeImageIndex, setactiveImageIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [countAction, setCountAction] = useState('');
  const [data, setdata] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [secondaryData, setsecondaryData] = useState({})
  const [isFavourite, setisFavourite] = useState(false)
  const route= useRoute()
  const navigation= useNavigation()
  const navigationState= useNavigationState(state => state)
  let image = data.img_src ? data.img_src : data.images && data.images.length > 0 ? data.images[0].src : ''


  useEffect(() => {
   // updating data from props to state
   if(data !== props.route.params.data){
     setdata(props.route.params.data)
   }

   

    //fetching realted  product ids 
   
    // console.log("!Object.keys(secondaryData).length && data.id",!Object.keys(secondaryData).length , data.product_id, data.id)
    console.log(" secondaryData.id !== props.route.params.data.id",  secondaryData.id !== props.route.params.data.id)
    if ( secondaryData.id !== props.route.params.data.id) {
      props.getProductById(props.route.params.data.id, (obj) => {
        
        console.log('runnn-------------', obj, obj.related_ids.toString())
        
        setsecondaryData(obj)
        obj.related_ids && obj.related_ids.length > 0 &&
        props.getRelatedProduct(obj.related_ids.toString(), (data) => setRelatedProducts(data))
      
      })
    }

    // fetching and update related products
    if (secondaryData.related_ids && secondaryData.related_ids.length > 0 && !relatedProducts.length) {
      props.getRelatedProduct(secondaryData.related_ids.toString(), data => setRelatedProducts(data))
    }


    //check if the prodcut exist in cardlist then update prodcut counter component
    // if(searchProduct && searchProduct.cartQuantity !== count ){
    //   setCount(searchProduct.cartQuantity)
    // }
    if(props.cartList.length){
      for (const item of  props.cartList ){
        console.log("@",item)
        if( item.id && data.id && item.id === data.id ){
          console.log(item.id, data.id, item.name, item.title)
          setCount(item.cartQuantity)
          break;
        }
        
      }
    }

    //searching product in favourite list  if product found marked as favourite 
    let isFavouriteProduct = props.favouriteList.find(item=>item.id===data.id)
    if(isFavouriteProduct){
        setisFavourite(true)
    }
   
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        // console.log("props.navigation.navigate-----------------------------------------------------------------------------------------------------------------------------",
        // props.navigation.navigate, route.name==="productDetails" && props.route.params.from && props.route.params.from==='shop',);
        // props.navigation.navigate props.navigation.navigate('mainShop');
          setsecondaryData([])
          setRelatedProducts([])
          setdata({})
          setCountAction('')
          setCount(0)
          setisFavourite(false)
          // if(route.name==="productDetails" && props.route.params.from && props.route.params.from==='shop'){
          //   props.navigation.navigate('home',{move:'mainShop', catg:data})
          //   alert(123123)
          // }
          // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",
          // props.navigation.navigate,
          // route.name==="productDetails" && props.route.params.from && props.route.params.from==='shop', route.name, props.route.params.from)
         
          // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzz",route.name, props.navigation)
      }
    );
  
    return () => backHandler.remove();


  }, [ 
    relatedProducts.length,
     props.cartList,
   data &&  Object.keys(data).length,
    // data,
  
      props.favouriteList && props.favouriteList.length, Object.keys(secondaryData).length])

  const handleFavourite = ()=>{
    if(!Object.keys(props.userAccessKey).length){
    
    }else{

      if(isFavourite){
        props.deleteWishListById(data.id,(data)=>{
          console.log("delete favoutire callback------------",data)
          setisFavourite(!isFavourite)
        })
      }else{
        props.addtoWishlist({product_id:data.id}, ()=>{
          console.log("add favourtire-=---------------",data)
          setisFavourite(!isFavourite)
        })
      }
    }

  }

  const handleRelatedProductClick = val=> {
      // console.log(val)
      setdata(val)
  }


  return (
    <>
      <Header />
      <ScrollView nestedScrollEnabled>

        <View style={{ backgroundColor: COLORS.white, minHeight:hp(80),  marginTop: 3 }}>
        
          <View style={styles.tagSection}>
            {data.tag && (
              <View style={styles.tagView}>
                <Text style={styles.tag}>{data.tag}</Text>
              </View>
            )}
            {data.discount && (
              <View style={[styles.tagView, { backgroundColor: COLORS.green }]}>
                <Text style={styles.tag}>{data.discount}</Text>
              </View>
            )}
          </View>
          <Image
            style={{ width: '100%', resizeMode: 'contain', height: 230 }}
            source={image?{uri:image}:IMAGES.placeHolderImage}
          />
       
          <View style={{ paddingHorizontal: 20 }}>
            <View>
              <Text style={styles.name}>{data.name || data.title}</Text>

            </View>
            <View style={{ flexDirection: 'row', marginVertical: '3%', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    styles.orignalPrice,
                    data.sale_price && { color:COLORS.lightGray, textDecorationLine: 'line-through' },
                  ]}>
                  <Text style={{ ...getFont('Roboto_r_18'), letterSpacing: -1 }}>
                    {' '} Rs {' '}

                  </Text>
                  {data.regular_price}
                </Text>
                
                {!!data.sale_price &&<Text style={styles.discountedPrice}>
                  <Text style={{ ...getFont('Roboto_r_18'), letterSpacing: -1 }}>
                    {' '} Rs{' '}
                  </Text>
                  {data.sale_price}</Text>}
              </View>

            </View>
            {/* <View style={{flexDirection:'row', width:wp(32), borderWidth:2, borderRadius:25, borderColor:COLORS.green, alignItems:'center', paddingHorizontal:'4%', height:35}}>
                  <ICONS.FontAwesome name={'check'} size={18} color={COLORS.green}/>
                   <Text style={{...getFont('OpenSans_b_14'), textTransform:'capitalize', color:COLORS.green}}>29 in stock</Text>
                  </View> */}
          </View>



          <View style={{ flexDirection: 'row', marginBottom: '2%', alignItems: 'center', paddingLeft: '5%' }}>
            <ICONS.FontAwesome name={'circle'} color={COLORS.darkBlue} size={12} />
            <Text style={{ ...getFont('OpenSans_m_14'), marginLeft: '2%' }}>Free Worldwide Shipping</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: '2%', alignItems: 'center', paddingLeft: '5%' }}>
            <ICONS.FontAwesome name={'circle'} color={COLORS.darkBlue} size={12} />
            <Text style={{ ...getFont('OpenSans_m_14'), marginLeft: '2%' }}>30 Days Return</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: '2%', alignItems: 'center', paddingLeft: '5%' }}>
            <ICONS.FontAwesome name={'circle'} color={COLORS.darkBlue} size={12} />
            <Text style={{ ...getFont('OpenSans_m_14'), marginLeft: '2%' }}>Member Discount</Text>
          </View>
            
      {relatedProducts.length>0 &&    <Text style={[styles.name,{marginTop:20, marginLeft:20, marginBottom:10}]}>Related Products</Text>}
           <ScrollView 
           showsHorizontalScrollIndicator={false}
           nestedScrollEnabled={true} horizontal={true}>
            {relatedProducts.map((item,index)=> <ProductCard data={item} onPressCard={(data)=>handleRelatedProductClick(data)}/>)}
            </ScrollView> 


          <View style={{ height: 100, backgroundColor: COLORS.white }} />


        </View>
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        // borderTopWidth: 0.3,
        marginTop: '5%',
        // borderTopColor: COLORS.gray3L,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        height: 70,
        width: wp(100),
        justifyContent: 'space-around',
        paddingHorizontal: '4%'
      }}>

      {count>0 ?
      
      <View style={[styles.countView, countAction === 'minus' && { paddingLeft: 0 }, countAction === 'plus' && { paddingRight: 0 }]}>
      <TouchableOpacity
        style={countAction === 'minus' && styles.counterBtn}
        onPress={() => {
          if(count-1===0){
            props.removeFromCart(data.id)
            setCountAction('minus');
          setCount( count - 1)
          }else{

            setCountAction('minus');
            setCount(count - 1 );
            props.addToCart(data, count - 1);
          }
        }}>
        <ICONS.AntDesign
          name={'minus'}
          color={countAction === 'minus' ? COLORS.white : COLORS.gray4}
          size={20}
        />
      </TouchableOpacity>
      <Text style={{ ...getFont('OpenSans_m_20') }}>{count}</Text>
      <TouchableOpacity
        style={countAction === 'plus' && styles.counterBtn}
        onPress={() => {
          setCountAction('plus');
          setCount(count + 1);
          props.addToCart(data,count +1);
        }}>
        <ICONS.AntDesign
          name={'plus'}
          color={countAction === 'plus' ? COLORS.white : COLORS.gray4}
          size={20}
        />
      </TouchableOpacity>
    </View>

      :<TouchableOpacity   onPress={() => {
        setCountAction('');
        setCount(count + 1);
        // alert(data.product_id);
        props.addToCart(data,1);

      }} >
          <View style={{
            backgroundColor: COLORS.green,
            width: wp(45),
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: '5%',

          }}>
            <ICONS.AntDesign name={'shoppingcart'} size={22} style={{marginTop:-5, marginRight:5}} color={COLORS.white} />
            <Text style={{ ...getFont('Poppins_m_14'), color: COLORS.white }}> Add to Cart</Text>
          </View>
        </TouchableOpacity>}
        <TouchableOpacity onPress={() =>handleFavourite()}>
          <View style={{
            backgroundColor:isFavourite?  COLORS.tomato : COLORS.lightGray,
            width: wp(45),
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row'
          }}>

            <ICONS.AntDesign name={'hearto'} style={{marginTop:-5, marginRight:5}}  size={23} color={ COLORS.white} />
            <Text style={{ ...getFont('Poppins_m_14'), color:COLORS.white }}> Wishlist</Text>
          </View>
        </TouchableOpacity>
      </View>

    </>
  );
};
const mapStateToProps = props => {
  return {
    isLoading: props.catgAngPrdt,
    cartList : props.cart.cartList,
    favouriteList : props.favourite.favouriteList,
    userAccessKey:props.auth.userAccessKey

  }
}

export default connect(mapStateToProps, { getProductById, removeFromCart, addToCart, getRelatedProduct ,  addtoWishlist,  deleteWishListById})(ProductDetails);

const styles = StyleSheet.create({
  tagSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '4%',
    position: 'absolute',
    zIndex: 200
  },
  tag: {
    textTransform: 'uppercase',
    ...getFont('OpenSans_m_15'),
    color: COLORS.white,
    textAlign: 'center',
  },
  tagView: {
    borderRadius: 4,
    backgroundColor: COLORS.red2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: wp(15),

  },
  arrowView: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    height: 200,
    zIndex: 300,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  name: {
    // textTransform: 'uppercase',
    // letterSpacing: -1.0,
    marginTop: 10,
    color: COLORS.black2,
    letterSpacing: 0,
    width: wp(60),
    ...getFont('OpenSans_b_18'),
  },
  orignalPrice: {
    color: COLORS.dark,
    ...getFont('OpenSans_r_16'),
    marginTop: 5
  },
  discountedPrice: {
    marginLeft: 5,
    color: COLORS.black2,
    letterSpacing: -1.0,
    ...getFont('OpenSans_r_18'),
  },
  countView: {
    flexDirection: 'row',
    // marginVertical: '5%',
    // marginTop:10,
    borderRadius: 15,
    borderColor: COLORS.light2,
    borderWidth: 1,
    width: wp(45),
    height: 50,
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    margin: '5%',
    backgroundColor: COLORS.white
  },

  counterBtn: {
    width: 45,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  centerCounterBtn: {

    backgroundColor: COLORS.green,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginTop: -30,
  },
});
