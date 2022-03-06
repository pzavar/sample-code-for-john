import React,{useState, useEffect} from 'react'
import { FlatList, TouchableOpacity,ScrollView,  Alert, StyleSheet, Text, View, SafeAreaView, Platform, TouchableHighlight } from 'react-native'
import {COLORS,getFont, wp, hp, ICONS,  IMAGES} from '../../constants'
import Card from './card'
import { useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import {clearCartList} from '../../store/actions'
const Cart = props => {
// const [selectAll, setSelectAll] = useState(false)

const [cardData, setcardData] = useState([])
const [total, settotal] = useState('')

const navigation = useNavigation()
useEffect(() => {
  if(cardData !== props.cartList){
      setcardData(props.cartList)

  }
    if(cardData.length){
        calculateTotal()
    }

  if(!props.cartList.length){
    settotal(0)
  }

  
}, [props.cartList.length, cardData])


    let calculateTotal = ()=>{

        let totalPrice =0
        for (const item of cardData) {
            let price = item.sales_price? item.sales_price: item.regular_price? item.regular_price:0
            let subtotal= price  * Number(item.cartQuantity)
           totalPrice = Number(totalPrice)+  Number(subtotal)
        //    console.log(price, subtotal, totalPrice)
        }
        settotal(totalPrice)
    }
    // console.log()
    const data=[
        {
            image:IMAGES.product,
            title:'Product Fruit',
            price :15,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Energetic Fruit',
            price :5,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Summer Fruit',
            price :55,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Sweet Fruit',
            price :115,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Product Fruit',
            price :15,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Energetic Fruit',
            price :5,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Summer Fruit',
            price :55,
            quantity:1,
            subtotal:5
        },
        {
            image:IMAGES.product,
            title:'Sweet Fruit',
            price :115,
            quantity:1,
            subtotal:5
        },
    ]
    return (
        <View style={[{backgroundColor:COLORS.light, paddingTop:Platform.OS==='ios'?40:0} ]} >
            {/* <Header/> */}
            <View style={[styles.header]}>
                <TouchableOpacity onPress={() => {
                    setcardData([])
                    navigation.goBack()}}>
                    <View style={{flexDirection:'row'}}>
                    <ICONS.AntDesign name={'arrowleft'} size={22} color={COLORS.tomato} />
                    {/* <Text style={{fontSize:14, fontFamily:'Poppins-Medium'}}>  Back</Text> */}
                    </View>
                </TouchableOpacity>   

                <Text style={styles.h1}>Cart</Text>

                { cardData.length>0? <TouchableOpacity onPress={() => {
                     Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete all products from cart? ',
                        [
                          {
                            text: "Cancel",
                            onPress: () => { },
                            style: "cancel"
                          },
                          { text: "OK", onPress: () =>{
                            settotal(0)  
                            props.clearCartList() }}
                        ]
          
          
                      )
                    }}>
                    <View style={{flexDirection:'row'}}>
                    <ICONS.EvilIcons name={'trash'}  size={25} color={COLORS.black} />
                    <Text t style={{fontSize:14, fontFamily:'Poppins-Medium'}} >Clear</Text>
               </View>
                </TouchableOpacity>: <View style={{width:60}}/>  }          
                </View>
                <ScrollView style={{backgroundColor:COLORS.light}}>
            <View style={styles.cardSection}>
              
                {props.cartList.map((item,index)=><Card key={index} calculateTotal={()=>calculateTotal()} index={index} data={item}/>)}
                </View>
                </ScrollView>
           
           { props.cartList.length > 0 && <View style={styles.checkoutSection}>

          <View>
              {/* <Text style={{color:COLORS.gray4, ...getFont('OpenSans_r_14')}}>Shipping  */}
                    {/* <Text style={{color:COLORS.tomato , fontWeight:'bold'}}>{'  '}Rs.0</Text></Text> */}
              <Text style={{color:COLORS.darkBlue, ...getFont('OpenSans_m_18')}}>Total: <Text  style={{color:COLORS.tomato , fontWeight:'bold'}}>{'  '}Rs. {total}</Text></Text>
          </View>
          <View>
              <TouchableHighlight style={styles.checkoutBtn} onPress={()=>navigation.navigate('checkout')}>
                  <Text style={styles.checkoutBtnText}>Check Out</Text>
              </TouchableHighlight>
          </View>
          
            </View>}
            
        </View>
    )
}

const mapStateToProps= props=>{
    const {cartList} = props.cart
    // console.log("cartListr-----------------------", props)
    return {
        cartList
    }
}

export default connect(mapStateToProps, {clearCartList} )(Cart)

const styles = StyleSheet.create({
    cardSection:{
        alignItems:'center',
        width:wp(100),
        minHeight:hp(100),
        paddingBottom:hp(15),
        // backgroundColor:COLORS.white,
        marginTop:-15,
    //    marginTop:'5%'
        flex:1
    },
    h1:{
        ...getFont('Poppins_m_20'),
        // fontWeight:'bold',
        // paddingTop:'6%',
        // paddingLeft:'1%',
        textAlign:'center',
        paddingBottom:0,
        letterSpacing:0.4,
        color:COLORS.green
    

      },
      header:{
        width:wp(100),
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
       height:60,
    //    marginBottom:-10,
    // //    elevation:3,
    //    shadowColor: "#000",
    //    shadowOffset: {
    //        width: 0,
    //        height: 1,
    //    },
    //    shadowOpacity: 0.22,
    //    shadowRadius: 2.22,
       borderBottomWidth:1,
        borderBottomColor:COLORS.light2,
       

       
       backgroundColor:'white',
       justifyContent:'space-between'
      },
      checkoutSection:{
          backgroundColor:COLORS.white,
          width:wp(100),
          height:60,
          paddingHorizontal:'4%',
          flexDirection:'row',
          position:'absolute',
          bottom:60,
        //   backgroundColor:'yellow',
          justifyContent:'space-between',
          alignItems:'center',
          elevation:3,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 1,
       },
       shadowOpacity: 0.22,
       shadowRadius: 2.22,
       borderBottomWidth:1,
       borderBottomColor:COLORS.light2,
      },
      checkoutBtn:{
          backgroundColor:COLORS.green,
          width:wp(30),
          height:'70%',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10
      },
      checkoutBtnText:{
          color:COLORS.light,
          ...getFont('Poppins_m_15')
      }
})
