import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {COLORS, getFont, ICONS, IMAGES, wp} from '../../constants'
import {connect} from 'react-redux'

const FlashTicker = props => {

      const [activeOfferIndex, setactiveOfferIndex] = useState(0);
      const [data, setData] = useState(['Ucaaz','Kuch Khas'])

    React.useEffect(() => {

        // console.log(`initializing interval`);
        const interval = setInterval(() => {
          let count = activeOfferIndex;
          setactiveOfferIndex(count < data.length ? count + 1 : 0);
          // console.log(activeOfferIndex)
        }, 2000);
        if(props.isMartAvailable==='unavailable'){
          setData(['Service unavailable in your area', 'Please select another area', 'Or contact help center!'])
        }else{
          setData(['Ucaaz','Kuch Khas'])
        }
    
        return () => {
          // console.log(`clearing interval`);
          clearInterval(interval);
        };
      }, [activeOfferIndex, props.isMartAvailable]);
    return (
        <View
        style={{
          backgroundColor: COLORS.darkBlue,
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
          zIndex: 90,
        }}>
        <Text
          style={{
            color: activeOfferIndex%2 !==0?COLORS.tomato:  COLORS.white,
            ...getFont('Montserrat_b_11'),
            textTransform: 'uppercase',
          }}>
          {' '}
          {data[activeOfferIndex]}{' '}
        </Text>
      </View>
    )
}
const mapStateToProps=props=>{
  return{
    isMartAvailable:props.user.isMartAvailable
  }
}
export default  connect(mapStateToProps,null) (FlashTicker)

const styles = StyleSheet.create({})
