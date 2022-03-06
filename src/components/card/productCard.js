import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {COLORS, getFont, hp, ICONS, IMAGES, wp} from '../../constants';
import Rating from '../rating';
import {connect} from 'react-redux'
import { addToCart, removeFromCart, setToast } from '../../store/actions';


const ProductCard = (props) => {
  const { style, index, from} = props
  const [count, setCount] = useState('');
  const [countAction, setCountAction] = useState('');
  const navigation = useNavigation()
  const [id, setId] = useState('')
  const [data, setdata] = useState({})
  let tag= data.discounted_price ? 'Hot':''
  let discountPercent= data.discounted_price? String(data.regular_price *data.discounted_price/100):''
  // from && from ==='deals' && console.log(".....................",data)

  useEffect(() => {

     // updating data from props to state
   if(data !== props.data){
    setdata(props.data)
  }
  if(((data.product_id && data.product_id !== id) ||( data.id && data.id !== id)) && count==='' ){
    setCount(0)
    // console.log(data.title, data.name, from, data.product_id, data.id)
    setId(data.product_id ? data.product_id: data.id)
  }
  //check if the prodcut exist in cardlist then update prodcut counter component
  if(props.cartList.length){
      for (const item of  props.cartList ){
        // console.log("@",item)
        if( item.id && data.id && item.id === data.id ){
          // console.log(item.id, data.id, item.name, item.title)
          setCount(item.cartQuantity)
          break;
        }
        
      }
    }
    if(props.cartList.length===0){
      setCount(0)
    }
  


  }, [props.cartList.length, data.product_id, count, data.id])
  return (
    <View
    key={index || Math.random(Math.random()*0.323)}
    onPress={()=>{props.onPressCard? props.onPressCard(data): navigation.navigate('productDetails',{data})}}
      style={[{
        marginTop:'1%',
        width: wp(50),
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom:'5%'
      },style]}>
      <TouchableOpacity onPress={()=>{ props.onPressCard? props.onPressCard(data): navigation.navigate('productDetails',{data:data, from:props.from})}} 
        style={{
          borderWidth: 1,
          width: wp(40),
          height: wp(40),
          alignItems: 'center',
          //   justifyContent: 'center',
          borderColor: COLORS.light2,
          // margin: 10,
          overflow: 'hidden',
        }}>
       {(!!tag || !!discountPercent) && <View
          style={styles.tagSection}>
          {!!tag && (
            <View style={styles.tagView}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
          )}
          {!!discountPercent && (
            <View style={[styles.tagView, {backgroundColor: COLORS.green}]}>
              <Text style={styles.tag}>{discountPercent}</Text>
            </View>
          )}
        </View>
       }

      {  data.images && <Image
          source={ data.images[0]? {uri:data.images[0].src}: IMAGES.placeHolderImage}
          style={{width: '100%', height: 150, resizeMode: 'contain'}}
          />}
             {  data.img_src && <Image
          source={ data.img_src? {uri:data.img_src}: IMAGES.placeHolderImage}
          style={{width: '100%', height: 150, resizeMode: 'contain'}}
          />}
       
      </TouchableOpacity>


      {count <= 0 ? (
        <TouchableOpacity
          onPress={ 
           !!props.selectedAddress &&  Object.keys(props.selectedAddress).length>0?
            () => {
            setCountAction('');
            setCount(count + 1);
            props.addToCart(data,1);
          }:()=> props.setToast('warning','Please select address to continue')
        
        }
          // onPress={()=>setCount(count + 1)}
          style={styles.centerCounterBtn}>
          <ICONS.AntDesign name={'plus'}  color={COLORS.white} size={20} />
        </TouchableOpacity>
      ) : (
        <View style={[
          styles.countView, 
          countAction==='minus'&&{paddingLeft:0}, 
          countAction==='plus' &&{paddingRight:0} ]}>
          <TouchableOpacity
            style={countAction === 'minus' && styles.counterBtn}
            onPress={() => {
              setCountAction('minus');
              if(count-1===0){
                props.removeFromCart(data.id?data.id:data.product_id)
                setCount(count > 0 ? count - 1 : count);
              }else{
                props.addToCart(data,count-1);
                setCount(count > 0 ? count - 1 : count);
              }
            }}>
            <ICONS.AntDesign
              name={'minus'}
              color={countAction === 'minus' ? COLORS.white : COLORS.gray4}
              size={20}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{count}</Text>
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
      )}

    <TouchableOpacity 
    style={{
    marginVertical: 10, width:'80%',
  }}
    onPress={()=>{props.onPressCard? props.onPressCard(data): navigation.navigate('productDetails',{data})}}>
{data.name &&
      <Text numberOfLines={2}
      style={{textAlign:'center', ...getFont('Poppins_m_14')}}>
        {data.name.length>25? data.name.slice(0,25)+'...': data.name}</Text>}

        {data.title &&
      <Text numberOfLines={2}
      style={{textAlign:'center', ...getFont('Poppins_m_14')}}>
        {data.title.length>25? data.title.slice(0,25)+'...': data.title}</Text>}

      </TouchableOpacity>
    
     { from && from ==='deals'?
     <View style={{flexDirection: 'row'}}>
        <Text
          style={ [ {fontSize:14}, data.discountedPrice && {textDecorationLine: 'line-through'}]}>
          Rs<Text style={{fontWeight: 'bold'}}>  {data.regular_price|| data.sales_price}</Text>
        </Text>
      
        {data.discounted_price&& <Text style={{fontSize:14}}>
          {' '}
          Rs<Text style={{fontWeight: 'bold'}}> {data.discounted_price}</Text>
        </Text>}
      </View>
     : <View style={{flexDirection: 'row'}}>
        <Text
          style={ [ {fontSize:14 , fontFamily:'Poppins-Regular'}, data.discountedPrice && {textDecorationLine: 'line-through'}]}>
          Rs<Text style={{fontWeight: 'bold'}}>  {data.regular_price}</Text>
        </Text>
        {data.discounted_price&& <Text style={{fontSize:14}}>
          {' '}
          Rs<Text style={{fontWeight: 'bold'}}> {data.discounted_price}</Text>
        </Text>}
      </View>}
  
    </View>
  );
};

const mapStateToProps= props =>{
  return{
    cartList : props.cart.cartList,
    selectedAddress: props.user.selectedAddress
  }
}

export default connect( mapStateToProps , {addToCart,setToast, removeFromCart})(ProductCard);

const styles = StyleSheet.create({
  tag: {
    textTransform: 'uppercase',
    ...getFont('Poppins_m_12'),
    color: COLORS.white,
  },
  tagView: {
    borderRadius: 4,
    backgroundColor: COLORS.red2,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countView: {
    flexDirection: 'row',
    marginVertical: 10,
    // marginTop:10,
    borderRadius: 35,
    borderColor: COLORS.light2,
    borderWidth: 1,
    width: wp(40),
    height: 60,
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    marginTop: -40,
    backgroundColor:COLORS.white
  },

  counterBtn: {
    width: 55,
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  centerCounterBtn:{

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
  tagSection:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '4%',
  }
});
