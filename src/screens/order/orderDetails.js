import React from 'react'
import { StyleSheet,Image, ScrollView, Text, View } from 'react-native'
import { COLORS, wp, hp,getFont, IMAGES } from '../../constants'
import OrderItemCard from './orderItemCard'

const OrderDetails = (data) => {
    console.log("order details",data.data)
    let {line_items}=data.data
    
    const card = (item,index)=>(
        <View style={styles.card}>
            <View>
                <Image  style={styles.image} source={item.image && item.image.length? {uri:item.image[0]}: item.img_src? {uri:img_src}:IMAGES.placeHolderImage} />
            </View>
            <View>
                <Text style={styles.productTitle}>{item.title || item.name}</Text>
                <Text style={styles.label}>Price: <Text style={styles.text}>{item.price}</Text> </Text>
                <Text style={styles.label}>Quantity: <Text style={styles.text}>{item.quantity}</Text></Text>
                <Text style={styles.label}>total: <Text style={styles.text}>{item.total}</Text></Text>
            </View>
        </View>
    )
    return (
        <View style={styles.container}>
              <View style={{ paddingLeft: '3%' }}>
      
      <View style={{flexDirection:'row', width:wp(90), justifyContent:'space-between'}}>

        <Text style={styles.label}>Order Number: <Text style={styles.text}>  {data.data.number}</Text></Text>
        <Text style={[styles.label,{color:COLORS.tomato, fontStyle:'italic'}]}>{data.data.status}</Text>
      </View>
        <Text  style={styles.label}>Order Placed At: {new Date(data.data.date_created).getDate()}-{new Date(data.data.date_created).getMonth()}-{new Date(data.data.date_created).getFullYear()}</Text>
     
        {data.data.date_completed && <Text  style={styles.label}>Order Completed At: {new Date(data.data.date_completed).getDate()}-{new Date(data.data.date_completed).getMonth()}-{new Date(data.data.date_completed).getFullYear()}</Text>}
        {data.data.payment_method_title && <Text  style={styles.label}>Payment Method: <Text style={styles.text}>{data.data.payment_method_title}</Text> </Text>}
    
   
       
        <View style={{ flexDirection: 'row', width: wp(92), justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.label]}>Total: <Text style={styles.text}>{data.data.total} Rs</Text></Text>

       
        </View>
      </View>
      <ScrollView>
            {line_items && line_items.map((item,index)=> card(item,index))}
      </ScrollView>
            
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.white,
        minHeight:hp(100),
        flex:1,
        paddingTop:20
    },
    image:{
        width:120,
        height:130,
        // resizeMode:'stretch'
    },
    card:{
        padding: '2%',
        backgroundColor: COLORS.white,
        width: wp(100),
      marginBottom: '1%',
      minHeight: 140,
      height: 'auto',
      borderRadius: 10,
      flexDirection: 'row',
    },
    productTitle: {
        ...getFont('Poppins_m_14'),
        width: wp(46),
        fontWeight: 'bold',
        // paddingLeft:'2%',
        paddingVertical: '2%',
        color: COLORS.gray,
        paddingBottom: 5,
    
      },
      label:{
        color:COLORS.gray,
        fontFamily:'Poppins-Medium',
        fontSize:14
      },
      text:{
        color:COLORS.green,
      }
    
})
