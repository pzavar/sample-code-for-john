import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Image, Text, View, Touchable } from 'react-native';
import { COLORS, ICONS, IMAGES, hp, getFont, wp } from '../../constants';
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from '../../store/actions';


const OrderItemCard = props => {
  const { data } = props
  const { image, title, price, subtotal, cartQuantity } = data;
  const [count, setCount] = useState('');
  const [countAction, setCountAction] = useState('');

  useEffect(() => {
    if (data.cartQuantity) {
      setCount(data.cartQuantity)
    }
  }, [data.cartQuantity])
  // console.log(props);
  return (
    <View
      key={props.index}
      style={[styles.card, props.index === 0 && { marginTop: 10 }]}>
      <View style={[styles.imageContainer]}>
        
        {data.img_src ?
         <Image source={{ uri: data.img_src }} style={styles.image} /> :
        data.images && data.images[0] ?
          <Image source={{ uri: data.images[0].src }} style={styles.image} />:
          <Image source={IMAGES.placeHolderImage}  style={styles.image }/>
        }
      
      
    
      </View>
      <View style={{ paddingLeft: '3%' }}>
      
        <Text style={styles.productTitle}>{data.name || data.title} </Text>
        <Text>Price: {data.sale_price || data.regular_price || data.price} Rs 
        
        {/* {JSON.stringify(data)} */}
        
        
        </Text>
        <Text>Quantity: {data.cartQuantity}</Text>
        <Text>SubTotal: {(data.sale_price || data.regular_price) * data.cartQuantity} Rs</Text>
        {/* <View style={{ flexDirection: 'row', width: wp(50), justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={[styles.countView, countAction === 'minus' && { paddingLeft: 0 }, countAction === 'plus' && { paddingRight: 0 }]}>
            <TouchableOpacity
              style={countAction === 'minus' && styles.counterBtn}
              onPress={() => {
                
                setCountAction('minus');
                if(count -1 ===0){
                  props.removeFromCart(data.id? data.id:data.product_id)
                }else{

                  props.addToCart(data, count - 1);
                  setCount(count > 0 ? count - 1 : count);
                  props.calculateTotal()
                }
              }}>
              <ICONS.AntDesign
                name={'minus'}
                color={countAction === 'minus' ? COLORS.white : COLORS.gray4}
                size={20}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{count}</Text>
            <TouchableOpacity
              style={countAction === 'plus' && styles.counterBtn}
              onPress={() => {
                setCountAction('plus');
                props.addToCart(data, count + 1);
                setCount(count + 1);
                props.calculateTotal()
              }}>
              <ICONS.AntDesign
                name={'plus'}
                color={countAction === 'plus' ? COLORS.white : COLORS.gray4}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.deleteSingleIcon}
            onPress={() => Alert.alert(
              'Remove Product From Cart',
              'Are you sure you want to delete this product',
              [
                {
                  text: "Cancel",
                  onPress: () => { },
                  style: "cancel"
                },
                { text: "OK", onPress: () => props.removeFromCart(data.id) }
              ]


            )}>
            <ICONS.EvilIcons name={'trash'} size={30} color={COLORS.orange} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const mapStateToProps = props => {
  const { cartList } = props.cart
  // console.log("cartListr-----------------------", cartList)
  return {
    cartList
  }
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(OrderItemCard)


const styles = StyleSheet.create({
  card: {
    // elevation:10,
    backgroundColor: COLORS.white,
    width: wp(100),
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    padding: '2%',

    // marginHorizontal: '2%',
    // marginBottom: '1%',
    minHeight: 110,
    maxHeight: 140,
    borderRadius: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    width: '40%',
    height: 'auto',
    margin: 4,
    backgroundColor: COLORS.light,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productTitle: {
    ...getFont('Poppins_m_14'),
    width: wp(46),
    fontWeight: 'bold',
    // paddingLeft:'2%',
    paddingVertical: '2%',
    color: COLORS.black1,
    paddingBottom: 5,

  },
  countView: {
    flexDirection: 'row',
    marginVertical: 10,
    // marginTop:10,
    borderRadius: 35,
    borderColor: COLORS.light2,
    borderWidth: 1,
    width: wp(30),
    height: 40,
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    // marginTop: -40,
    backgroundColor: COLORS.white
  },

  counterBtn: {
    width: 35,
    height: '100%',
    borderRadius: 100,
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
  deleteSingleIcon: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    marginLeft: '10%',
    borderColor: COLORS.gray2
  }
});
