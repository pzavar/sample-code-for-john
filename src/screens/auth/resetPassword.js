import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableHighlight, BackHandler, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/layout/header'
import { IMAGES, ICONS, getFont, wp, hp, COLORS, screenHeight } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import TextField from '../../components/formFields/textField'
import { ScrollView } from 'react-native-gesture-handler'
import { validateEmail, validatePassword } from '../../util'
import { connect } from 'react-redux'
import { setToast, resetPassword } from '../../store/actions'
import { message } from '../../store/message'


const ResetPasswordComponent = props => {
    const navigation = useNavigation()
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => handleReset());
        return () => BackHandler.removeEventListener("hardwareBackPress", () => handleReset());

    }, [])

    const handleLogin = async () => {
        try {
            if (!password) throw 'Password field is required'
            if (!confirmPassword) throw 'Confirm Password field is required'
            if (!validatePassword(password))
                throw ' hint: the password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & ).'

            if (password !== confirmPassword) throw 'Password should match each other'

            let obj = { password: password, email: props.route.params.email, }
            props.resetPassword(obj, () => {
                navigation.navigate('home')
                handleReset()
            })
        } catch (error) {
            props.setToast('error', error)
        }
    }

    const handleReset = () => {
        setshowConfirmPassword(false)
        setshowConfirmPassword(false)
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: COLORS.white, paddingHorizontal: '5%' }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    handleReset()
                    navigation.toggleDrawer()}}>
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

            <Text style={styles.title}>Reset Password </Text>
            <View style={{ alignItems: 'center' }}>
                <View>

                    <TextField
                        reset={reset}
                        setReset={() => setReset(!reset)}
                        secureText={!showPassword} label={'New Password'} value={password} onTermChange={(val) => setPassword(val)} />
                    <View style={[styles.smallBtn, { backgroundColor: COLORS.white, alignItems: 'flex-end' }]}>

                        <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                            <ICONS.Entypo name={showPassword ? "eye-with-line" : "eye"} color={COLORS.green} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <TextField
                        reset={reset}
                        setReset={() => setReset(!reset)}
                        secureText={!showConfirmPassword} label={'confirm Password'} value={confirmPassword} onTermChange={(val) => setConfirmPassword(val)} />
                    <View style={[styles.smallBtn, { backgroundColor: COLORS.white, alignItems: 'flex-end' }]}>

                        <TouchableOpacity onPress={() => setshowConfirmPassword(!showConfirmPassword)}>
                            <ICONS.Entypo name={showConfirmPassword ? "eye-with-line" : "eye"} color={COLORS.green} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{color:COLORS.lightGray, fontSize:12,
                    width:wp(85),
                    marginTop:5,
                    fontFamily:'Poppins-Regular'}}>{message.password.desc}</Text>
                <TouchableHighlight style={styles.btn} onPress={() => handleLogin()}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableHighlight>

                <Text style={styles.caption}>Don't have an account? <Text
                    onPress={() =>{
                        handleReset()
                        navigation.navigate('signup')}}
                    style={{ color: COLORS.tomato, fontFamily: 'OpenSans-Medium', fontSize: 15 }}>Sign up</Text></Text>

            </View>

        </ScrollView>
    )
}


export default connect(null, { setToast, resetPassword })(ResetPasswordComponent)
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
        backgroundColor: COLORS.green,
        // borderWidth: 2,
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: '5%',
        alignSelf: "center",
    },
    btnText: {
        color: COLORS.white,
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
