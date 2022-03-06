import React, { useState } from 'react'
import {  Alert, TouchableHighlight,  Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native'

import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { message } from '../../store/message'
import {connect} from 'react-redux'
import { setToast } from '../../store/actions'
import TextField from '../formFields/textField'

const VerificationModal = (props) => {

    const {onResend, onVerify, isVisible, goBack, from="email"}=props

    const [otpcode, setotpcode] = useState('')

    const handleSubmit=()=>{
        // Alert.alert(otpcode)
        // console.log(otpcode)
        if(otpcode.length<6){
           return props.setToast('error', message.verification.error)
        }
       return onVerify(otpcode)
    }
    // console.log(otpcode)

    return (
      
       isVisible? <View style={{backgroundColor:COLORS.white, flex:1}}>
            <TouchableOpacity onPress={()=>goBack()}>
                <View style={styles.backview}>
                    <ICONS.AntDesign name={'arrowleft'} size={20} color={COLORS.black} />
                    <Text style={[styles.smallBtnText, { color: COLORS.dark, fontSize: 16 }]}>  Back</Text>

                </View>
            </TouchableOpacity>
            <View style={{ alignSelf: 'center' }}>

                <Text style={styles.title}>Verification Code</Text>
                <Text style={{color:COLORS.lightGray, marginLeft:'3%', marginTop:'-3%', marginBottom:'10%'}}>A verification code has been sent to your {from} </Text>

                <TextField
                    placeholder={'Enter Verification Code'}
                    style={{textAlign:'center', marginTop:10}}
                    maxLength={7}
                    keyboardType={'numeric'}
                    label={'Verification code'} 
                    value={otpcode}
                     onTermChange={val => setotpcode(val)} />
           
            <TouchableHighlight
            underlayColor={COLORS.tomato}
            onPress={() =>handleSubmit()}
            style={[styles.btn, { backgroundColor: COLORS.green, width: wp(85) }]}>
                <Text style={[styles.btnText, { color: COLORS.white }]}>Verify</Text>
            </TouchableHighlight>
            <Text style={[styles.caption,{textAlign:'center'}]}>To send verification code again press <Text
            onPress={() =>onResend()}
            style={{ color: COLORS.tomato, fontFamily: 'OpenSans-Medium',  fontSize: 15 }}>Resend</Text></Text>
            </View>


        </View>:null
    
    )
}

export default  connect(null,{setToast})( VerificationModal)

const styles = StyleSheet.create({
    caption: {
        marginTop: '3%',
        color: COLORS.gray,
        ...getFont("OpenSans_r_14"),
    },

    backview: {
        flexDirection: 'row',
        margin: '5%'
    },
    btn: {
        width: "95%",
        borderColor: COLORS.green,
        borderWidth: 2,
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: '5%',
        alignSelf: "center",
    },
    btnText: {
        color: COLORS.green,
        ...getFont("OpenSans_m_17"),
        textTransform: "uppercase",
    },
    title: {
        ...getFont('Poppins_m_22'),

        // textAlign: 'center',
        color: COLORS.green,
        // marginTop: - hp(1),
        marginLeft: '4%',
        marginBottom: hp(2)
    },

})
