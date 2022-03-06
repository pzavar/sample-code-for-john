import { placeholder } from '@babel/types'
import React, {useState, useEffect} from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { COLORS, getFont, ICONS, wp } from '../../constants'

const TextField = (props) => {
    const{ value, label,editable=true, labelStyle,reset, setReset,blurOnSubmit=true, multiline=false, required, maxLength=1000, onTermChange, placeholder, style, keyboardType='default', secureText=false}= props 
    // console.log(secureText)
    const [input, setinput] = useState('')
    
    useEffect(() => {
       if(value && !input){
           setinput(value)
       }
       if(reset){
        //    console.log('cleearrrrrrrrrrrrrr')
           setinput('')
           setReset(false)
       }
    }, [value, reset])

    
    const handleTextChange= val => {
        setinput(val)
        onTermChange(val)
    }
    return (
        <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {label &&<Text style={[styles.label, labelStyle]}>{label}</Text>}
           {required && <ICONS.FontAwesome5 name={'star-of-life'} color={COLORS.orange}/>}
            </View>
        
           <TextInput 
           placeholderTextColor={COLORS.gray4}
           keyboardType={keyboardType}
           secureTextEntry={secureText}
           blurOnSubmit={blurOnSubmit}
        //    secureTextEntry={secureText}
           style={[styles.input, style, !editable && {color:COLORS.lightGray}]} 
           onChangeText={(val)=>handleTextChange(val)} 
           value={input} 
           maxLength={maxLength}
           multiline={multiline}
           editable={editable}

        //    onBlur={()=>Keyboard.dismiss()}
           placeholder={placeholder}/>
        </View>
    )
}

export default TextField

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:1,
        borderBottomColor:COLORS.lightGray,
     
        color:COLORS.dark,
        // lineHeight:33,
        // height:40,
        width:wp(85),
        ...getFont('Poppins_m_14'),
        fontSize:14,
        paddingVertical:2,
        marginBottom:5,
        marginTop:2,
        // lineHeight:12,
        // paddingHorizontal:'4%',
        // marginBottom:'4%',
    },
    label:{
        paddingHorizontal:'2%',
        paddingTop:'2%',
        color:COLORS.black2,
        ...getFont('OpenSans_r_14'),
    }
})
