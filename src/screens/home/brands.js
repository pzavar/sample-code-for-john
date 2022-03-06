import React, {useEffect, useRef, useState} from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import { COLORS, hp, screenWidth, SIZES } from '../../constants'
import { getBrands } from '../../store/actions'

const Brands = props => {
    const ref = useRef(null)
    const [count, setcount] = useState(1)
    const [total, settotal] = useState(0)

    useEffect(() => {
       if(!props.brands.length){
           props.getBrands()
       }else{
           settotal(props.brands.length)
       }
       setInterval(() => {
           handleAutoScroll()
       }, 3000);
    }, [props.brands.length])

    const handleAutoScroll = ()=>{
        // console.log(count < props.brands.length/2, count , props.brands.length, props.brands.length/2)
        if(total >0 && count <= ( total)/2 ){
            // console.log(count, count *  (130* ( total + 1 )/2))
          ref && ref.current&&  ref.current.scrollTo({ x: count *( 130* ( total + 1 )), animated:true })
            setcount(count+0.5)
            // return;
        }else{
            setcount(1)
            ref && ref.current&& ref.current.scrollTo({ x: 0,animated: true})
        }      
    }

    return (
        <View style={{height:150, backgroundColor:COLORS.white}}>
            
      <ScrollView  decelerationRate={0.1} ref={ref}  horizontal showsHorizontalScrollIndicator={false}>
         {props.brands.map((item,index)=>(
             <TouchableHighlight  activeOpacity={1}>

                 <Image style={styles.image} key={index} source={{uri:item}} />
             </TouchableHighlight>
         ))}
      </ScrollView>
        </View>
    )
}

const mapStateToProps=props=>{
    return{
        brands: props.home.Brands
    }
}
export default connect(mapStateToProps, {getBrands})( Brands)

const styles = StyleSheet.create({
    image:{
        width:130,
        height:100,
        resizeMode:'contain',
        marginTop:20,
    }
})
