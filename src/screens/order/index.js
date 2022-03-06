import React, { useState, useEffect } from 'react'
import { FlatList, TouchableOpacity, ScrollView, Alert, StyleSheet, Text, View, SafeAreaView, Platform, TouchableHighlight } from 'react-native'
import { COLORS, getFont, wp, hp, ICONS, IMAGES } from '../../constants'
import OrderCard from './card'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { getMyOrders } from '../../store/actions'
import OrderDetails from './orderDetails'
const Order = props => {
    // const [selectAll, setSelectAll] = useState(false)


    const [orderList, setOrderList] = useState([])
    const [getData, setgetData] = useState(false)
    const [details, setdetails] = useState({})

    const navigation = useNavigation()
    useEffect(() => {
        if (Object.keys(props.userAccessKey).length) {
            if (props.myOrders.length && props.myOrders.length !== orderList) {
                setOrderList(props.myOrders)
            } else {
                // if(!getData){
                props.getMyOrders((data) => {
                    console.log("2----- dataaa", data, getData)
                    setgetData(true)
                    data && data.length > 0 && setOrderList(data)
                })
                // }
            }
        }

    }, [Object.keys(props.userAccessKey).length, props.myOrders.length, orderList.length])


    console.log(props.myOrders.length)

    return (
        <View>
            <View style={[{ backgroundColor: COLORS.light, paddingTop: Platform.OS === 'ios' ? 40 : 0 }]} >
                {/* <Header/> */}
                <View style={[styles.header]}>
                    <TouchableOpacity onPress={Object.keys(details).length > 0?
                  ()=>  setdetails({}):
                    () => {
                        setdetails({})
                        // setcardData([])
                        navigation.goBack()
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <ICONS.AntDesign name={'arrowleft'} size={22} color={COLORS.tomato} />
                            {/* <Text style={{fontSize:14, fontFamily:'Poppins-Medium'}}>  Back</Text> */}
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.h1}>{Object.keys(details).length > 0?'Order Details' :'My Orders'}</Text>

                    <View style={{ width: 60 }} />
                </View>
            </View>

            {Object.keys(details).length > 0 ?
                <OrderDetails data={details} />
                : <View >


                    {orderList.length > 0 ? <ScrollView style={{ backgroundColor: COLORS.light }}>
                        <View style={styles.cardSection}>

                            {orderList.map((item, index) => <OrderCard
                             key={index} 
                             index={index} 
                             updateOrderList={data=>setOrderList(data)}
                             onPressCard={data => setdetails(data)} data={item} />)}
                        </View>

                    </ScrollView> : <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>No Order Available</Text>
                    </View>}

                </View>}
        </View>
    )
}

const mapStateToProps = props => {
    const { myOrders } = props.order
    const { userAccessKey } = props.auth
    console.log("1 my orders==============", myOrders, userAccessKey)
    return {
        myOrders,
        userAccessKey
    }
}

export default connect(mapStateToProps, { getMyOrders })(Order)

const styles = StyleSheet.create({
    cardSection: {
        alignItems: 'center',
        width: wp(100),
        minHeight: hp(100),
        paddingBottom: hp(15),
        // backgroundColor:COLORS.white,
        marginTop: -15,
        //    marginTop:'5%'
        flex: 1
    },
    h1: {
        ...getFont('Poppins_m_18'),
        // fontWeight:'bold',
        // paddingTop:'6%',
        paddingLeft: 25,
        textAlign: 'center',
        paddingBottom: 0,
        letterSpacing: 0.4,
        color: COLORS.green


    },
    header: {
        width: wp(100),
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        height: 60,
        //    marginBottom:-10,
        // //    elevation:3,
        //    shadowColor: "#000",
        //    shadowOffset: {
        //        width: 0,
        //        height: 1,
        //    },
        //    shadowOpacity: 0.22,
        //    shadowRadius: 2.22,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light2,



        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    checkoutSection: {
        backgroundColor: COLORS.white,
        width: wp(100),
        height: 60,
        paddingHorizontal: '4%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 60,
        //   backgroundColor:'yellow',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light2,
    },
    checkoutBtn: {
        backgroundColor: COLORS.green,
        width: wp(30),
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    checkoutBtnText: {
        color: COLORS.light,
        ...getFont('Poppins_m_15')
    },
    emptyText: {
        color: COLORS.light2,
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginTop: -hp(20)
    },
    emptyView: {
        // flex:1,
        height: hp(100),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
