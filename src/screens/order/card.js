import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Image, Text, View, Touchable } from 'react-native';
import { COLORS, ICONS, IMAGES, hp, getFont, wp } from '../../constants';
import { connect } from 'react-redux'
import { cancelOrderById } from '../../store/actions';


const OrderCard = props => {
  const { data } = props
 
  return (
    <TouchableOpacity
    onPress={()=>props.onPressCard(data)}
      key={props.index}
      style={[styles.card, props.index === 0 && { marginTop: 20 }]}>
    
      <View style={{ paddingLeft: '3%' }}>
      
      <View style={{flexDirection:'row', width:wp(90), justifyContent:'space-between'}}>

        <Text style={styles.label}>Order Number: <Text style={styles.text}>  {data.number}</Text></Text>
        <Text style={[styles.label,{color:COLORS.tomato, fontStyle:'italic'}]}>{data.status}</Text>
      </View>
        <Text  style={styles.label}>Order Placed At: {new Date(data.date_created).getDate()}-{new Date(data.date_created).getMonth()}-{new Date(data.date_created).getFullYear()}</Text>
     
        {data.date_completed && <Text  style={styles.label}>Order Completed At: {new Date(data.date_completed).getDate()}-{new Date(data.date_completed).getMonth()}-{new Date(data.date_completed).getFullYear()}</Text>}
        {data.payment_method_title && <Text  style={styles.label}>Payment Method: <Text style={styles.text}>{data.payment_method_title}</Text> </Text>}
    
   
       
        <View style={{ flexDirection: 'row', width: wp(92), justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[styles.label]}>Total: <Text style={styles.text}>{data.total} Rs</Text></Text>

         {data.status==='processing' && <TouchableOpacity
            style={styles.deleteSingleIcon}
            onPress={() => Alert.alert(
              'Confirmation',
              'Are you sure you want to cancel the order?',
              [
                {
                  text: "Cancel",
                  onPress: () => { },
                  style: "cancel"
                },
                { text: "OK", onPress: () => props.cancelOrderById(data.id, data=>props.updateOrderList(data)) }
              ]


            )}>
            <Text style={styles.text}>Cancel Order</Text>
          </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default connect(null, { cancelOrderById })(OrderCard)


const styles = StyleSheet.create({
  card: {
    
      padding: '2%',
      backgroundColor: COLORS.white,
      width: wp(100),
    marginBottom: '1%',
    minHeight: 140,
    height: 'auto',
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
    paddingHorizontal:10,
    marginLeft: '10%',
    borderColor: COLORS.tomato
  },

  label:{
    color:COLORS.gray,
    fontFamily:'Poppins-Medium',
    fontSize:14
  },
  text:{
    color:COLORS.green,
  }






});
