import React ,{useEffect}from 'react'
import { StyleSheet, Image,Text, View } from 'react-native'
import { COLORS, IMAGES,wp, hp } from '../../constants'

const Splash = props => {

 
    setTimeout(() =>  props.navigation.replace('drawer'), 3000);

 

    
    return (
        <View style={styles.container}>
            <Image source={IMAGES.logowhite} style={styles.image}/>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        width:wp(100),
        height:hp(100),
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.green
    },
    image:{
        width:200,
        height:200,
        resizeMode:'contain'
    }
})
