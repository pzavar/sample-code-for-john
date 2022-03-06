import React, { useState, useEffect } from 'react'
import { ImageBackground, BackHandler,  TouchableHighlight, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/layout/header'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import TextField from '../../components/formFields/textField'
import { ScrollView } from 'react-native-gesture-handler'
import { validateEmail, validatePassword } from '../../util'
import {connect} from 'react-redux'
import { setToast, login, forgetPassword } from '../../store/actions'
import { message } from '../../store/message';


const Login = props => {
    const navigation = useNavigation()
    const [showPassword, setshowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", ()=>handleReset());
        return () => BackHandler.removeEventListener("hardwareBackPress", ()=>handleReset());
       
    }, [])

  
    const handleLogin =()=>{
        try {
            if(!email) throw 'Username field is required'
            if(!password) throw 'Password field is required'
            
            let obj={ username:email, password:password }
            props.login(obj,()=>{
                handleReset()
                navigation.navigate('home')
            })
        } catch (error) {
            props.setToast('error', error)
        }
    }
    const handleReset=()=>{
        setEmail('')
        setPassword('')
        setshowPassword(false)
        setReset(true)
    }

    return (
        <ScrollView  
        // keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: COLORS.white, paddingHorizontal: '5%' }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    handleReset()
                    navigation.toggleDrawer()
                    }}>
                    <ICONS.FontAwesome name={'bars'} size={27} color={COLORS.tomato} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 0.6, marginLeft: '10%' }}
                    onPress={() => {
                        handleReset()
                        navigation.navigate('home') }}>
                    <Image source={IMAGES.logo} style={styles.logo} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Sign In </Text>
            <View style={{ alignItems: 'center' }}>

                <TextField
                reset={reset}
                setReset={()=>setReset(!reset)}
                    label={'Email'}
                    //  style={{width: email.length?wp(60):wp(85) }}
                    value={email} onTermChange={(val) => setEmail(val)} />

                <View>
                    <TextField
                    //   style={{backgroundColor:'red'}}
                    reset={reset}
                    setReset={()=>handleReset()}
                        secureText={!showPassword} label={'password'} value={password} onTermChange={(val) => setPassword(val)} />
                    <View style={[styles.smallBtn, { width:40, backgroundColor: COLORS.white, alignItems: 'flex-end' }]}>
                        <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                            <ICONS.Entypo name={showPassword ? "eye-with-line" : "eye"} color={COLORS.green} size={25} />
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={{color:COLORS.lightGray, fontSize:12,
                    width:wp(90),
                    marginTop:5,
                    fontFamily:'Poppins-Regular'}}>{message.password.desc}</Text> */}
                </View>
                <TouchableOpacity 
                style={{ paddingVertical:10}}
                onPress={() => {
                    navigation.navigate('forgetPassword');
                    handleReset();
                    }}>
                <Text   style={[styles.caption,{textDecorationLine:'underline'}]}>
                   Forget Password?</Text>
                </TouchableOpacity>

                <TouchableHighlight
                underlayColor={COLORS.greenShade01}
                style={styles.btn} onPress={() =>handleLogin()}>
                    <Text style={styles.btnText}>Sign In</Text>
                </TouchableHighlight>

                <Text style={styles.caption}>Don't have an account? <Text
                    onPress={() => {
                        handleReset()
                        navigation.navigate('signup')
                    }}
                    style={{ color: COLORS.tomato, fontFamily: 'OpenSans-Medium', fontSize: 15 }}>Sign up</Text></Text>

            </View>

        </ScrollView>
    )
}
// const mapStateToProps=props=>{
//     return {
    
//     }
// }

export default connect(null, {setToast, login , forgetPassword})(Login)
const styles = StyleSheet.create({
    header: {
        width: wp(100),

        paddingTop: '10%',
        paddingBottom: '5%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        //  paddingTop:'20%'
    },

    logo: {
        width: wp(35),
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: '-10%',
        // marginTop: 10,
        transform: [{ scale: 1.3 }],

    },
    title: {
        ...getFont('Poppins_m_22'),

        // textAlign: 'center',
        color: COLORS.green,
        // marginTop: - hp(1),
        marginLeft: '4%',
        marginBottom: hp(2)
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
    smallBtn: {
        backgroundColor: COLORS.green,
        borderRadius: 25,
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: hp(1.5)
    },
    smallBtnText: {
        color: COLORS.white,

        ...getFont("OpenSans_m_14"),
        textTransform: "uppercase",
    },
    caption: {
        marginTop: '3%',
        color: COLORS.gray,
        ...getFont("OpenSans_r_14"),
    }

})
