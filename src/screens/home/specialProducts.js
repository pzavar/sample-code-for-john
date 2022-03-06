import React,{useState, useEffect} from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-animatable'
import Rating from '../../components/rating'
import { COLORS, getFont, wp } from '../../constants'
import {connect} from 'react-redux'
import { getSpecialProduct } from '../../store/actions'


const SpecialProduct = props => {
    const [image, setimage] = useState('')
useEffect(() => {
  if(!props.specialProduct){
      props.getSpecialProduct()
  }else{
      setimage(props.specialProduct)
    }
}, [props.specialProduct])
// console.log("props.specialProduct---------------------------",props.specialProduct)
    
    const card=(title, desc, bgColor)=>{
       return (
       <View style={[styles.card, bgColor&&{backgroundColor:bgColor}]}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDesc}>{desc}</Text>
        </View>)
    }
    return (
        <ImageBackground 
        style={{width:'100%', alignItems:'center', paddingBottom:40}}
        source={{uri:'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/mid-img.jpg'}}>
            <Text style={styles.title}>TO BE THE FIRST CHOICE OF CUSTOMERS FOR BASIC NECESSITIES OF LIFE</Text>
            <Text style={styles.subTitle}>BETTER CUSTOMER EXPERIENCE</Text>
            {card(
                'BEST PRICE IN NEIGHBORHOOD',
                'UCAAZ is committed to offer best price of groceries through its chain of local signature outlets & online.',
                COLORS.violet
            )}
             {card(
                'SHOP IN VARIETY',
                'Our local branches in your neighborhood have around 3000 SKUs of grocery and selected categories.',
                COLORS.skyBlue
            )}
            <View style={styles.circleView}>
                <Image style={{width:'100%', height:'100%', resizeMode:'cover'}} source={{uri: image?image:'https://f59acccaf0.nxcli.net/wp-content/uploads/2018/12/p16-318x318.jpg'}}/>
                {/* <Text>{image}</Text> */}
             
            </View>

            {card(
                'CASHLESS SHOPPING LOCALLY',
                'UCAAZ offers you cashless buying in your neighborhood using card payment machines.',
                COLORS.seaGreen
            )}
             {card(
                'CUSTOMER SERVICE',
                'We believe in best service to our valued customers to serve customers efficiently, pleasantly and give respect.',
                COLORS.red
            )}
        </ImageBackground>
    )
}

const mapStatetoProps = props => {
    const{specialProduct}= props.home
    console.log(specialProduct)
    return{
        specialProduct
    }
}

export default connect(mapStatetoProps,{getSpecialProduct})(SpecialProduct)

const styles = StyleSheet.create({
    circleView:{backgroundColor:COLORS.white,
        borderRadius:200, 
        alignItems:'center', 
        justifyContent:'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        overflow:'hidden',
        elevation: 4,
         width:wp(95), 
         height:wp(95),
         marginBottom:'6%'
        },

    title:{
        color:COLORS.white,
        marginTop:'10%',
        ...getFont('Poppins_m_20'),
        // letterSpacing:-1.5,
        width:'80%',
        letterSpacing:-0.5,
        // fontSize:20,
        // fontFamily:'Roboto÷Condensed-Regular',
        // fontFamily:'Owswald-Light',
        textTransform:'uppercase',
        textAlign:'center'
    },
    subTitle:{
        color:COLORS.white,
        marginVertical:'4%',
        ...getFont('Roboto_b_34'),
        fontSize:30,
        // letterSpacing:-1.5,
        width:'80%',
        marginBottom:'7%',
        // fontSize:20,
        // fontFamily:'Roboto÷Condensed-Regular',
        // fontFamily:'Owswald-Light',
        textTransform:'uppercase',
        textAlign:'center'
    },
    card:{
        width:wp(90),
        height:150,
        marginVertical:10,
        borderRadius:20,
        alignSelf:'center',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginBottom:'6%'

     },
     cardTitle:{
         color:COLORS.white,
        ...getFont('Poppins_m_18'),
        textTransform:'uppercase',
       letterSpacing:-0.5,
       width:'70%',
       marginBottom:-10,
       textAlign:'center',
       fontWeight:'500'
     },
     cardDesc:{
         color:COLORS.light2,
         textAlign:'center',
         width:'80%',
         marginTop:15,
         fontSize:14
     }
})
