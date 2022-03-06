import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import { COLORS, getFont, wp, hp, ICONS, IMAGES } from '../../constants';
import { connect } from 'react-redux'
import { getRelatedProduct } from '../../store/actions';
import CheckOutCard from './card'
import { ScrollView } from 'react-native-gesture-handler';
const OrderDetails = props => {
    const [total, settotal] = useState(0)
    useEffect(() => {
        if (props.cartList.length) {

            let totalPrice = 0
            for (const item of props.cartList) {
                let price = item.sales_price ? item.sales_price : item.regular_price ? item.regular_price : 0
                let subtotal = price * Number(item.cartQuantity)
                totalPrice = Number(totalPrice) + Number(subtotal)
                // console.log(price, subtotal, totalPrice)
            }
            settotal(totalPrice)
        }
    }, [])
    return (
        <>
        <ScrollView>
            <View style={styles.formSection}>
                {/* <Text style={styles.h2}>Your Order</Text> */}
                {/* <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.cell}>
                  <Text style={styles.th}>Product</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.th}>Subtotal</Text>
                </View>
              </View>
              <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.cell}>
                  <Text style={styles.td}>this is dummy product</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.td}>Rs 5.00</Text>
                </View>
              </View>
              <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.cell}>
                  <Text style={styles.th}>Subtotal</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.td}>Rs 5.00</Text>
                </View>
              </View>
              <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.cell}>
                  <Text style={styles.th}>Total</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.th}>Rs5.00</Text>
                </View> */}
                {/* </View> */}
                {!!props.cartList.length && props.cartList.map((item, index) => <CheckOutCard data={item} index={index} />)}
                <View style={{ paddingVertical: '4%', paddingHorizontal: '10%' }}>
                    <Text>Cash on delivery</Text>
                    <Text>Pay with cash on delivery</Text>
                    <Text>Your personal data will be used to process your order, support your experience
                        throughtout this website and for other purposes described in our{'  '}
                        <Text style={styles.link} onPress={() => alert('goto privacy policy')}>privacy policy</Text>
                    </Text>

                </View>
            </View>
        </ScrollView>
                <View style={styles.checkoutSection}>

                    <View>
                        <Text style={{ color: COLORS.darkBlue, ...getFont('OpenSans_m_18') }}>Total: <Text style={{ color: COLORS.tomato, fontWeight: 'bold' }}>{'  '}Rs. {total}</Text></Text>
                    </View>
                    <View>
                        <TouchableHighlight underlayColor={COLORS.tomato} style={styles.checkoutBtn} onPress={() => props.handleCreateOrder(props.cartList, total)}>
                            <Text style={styles.checkoutBtnText}>Confirm Order</Text>
                        </TouchableHighlight>
                    </View>

                </View>
           </>
    )
}
const mapStateToProps = props => {
    return {
        cartList: props.cart.cartList
    }
}
export default connect(mapStateToProps, { getRelatedProduct })(OrderDetails)
const styles = StyleSheet.create({
    label: {
        paddingLeft: 0,
        // marginLeft:-10
    },
    h1: {
        ...getFont('OpenSans_m_20'),
        textAlign: 'center',
        paddingBottom: 0,
        letterSpacing: 0.4,
    },
    header: {
        width: wp(100),
        alignItems: 'center',
        // paddingHorizontal:10,
        flexDirection: 'row',
        height: 60,
        // elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light2,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'white',
        //    justifyContent:'space-between'
    },
    formSection: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingTop: '4%',
          paddingBottom: '20%',
        //   height:hp(200)
    },
    input: {
        borderWidth: 0,
        height: 45,
        width: wp(90),
        paddingLeft: 0,
        marginBottom: '3%',
    },
    sideBtn: {
        width: wp(28),
        backgroundColor: COLORS.green,
        height: 45,
        marginLeft: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '2%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        //   justifyContent: 'space-between',
        marginBottom: '3%',
        width: wp(90),
        marginBottom: 10
        //   marginTop:-5,
    },
    sideBtnText: { color: COLORS.white, ...getFont('Poppins_m_16') },

    btnText2: {
        color: COLORS.white,
        width: 100,
        borderRadius: 10,
        // height:wp(10),
        textAlign: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        //  marginRight:wp(20),
        backgroundColor: COLORS.green
    },
    nextBtn: {
        color: COLORS.white,
        width: 100,
        borderRadius: 10,
        // height:wp(10),
        textAlign: 'center',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        //  marginLeft:wp(90),
        backgroundColor: COLORS.green
    },
    h2: {
        color: COLORS.green,
        alignSelf: 'flex-start',
        paddingBottom: '4%',
        paddingLeft: '4%',
        ...getFont('Poppins_m_20')
    },
    cell: {
        borderWidth: 0.5,

        borderColor: COLORS.gray2,
        flex: 1,
        width: '50%',
        height: 40,
        padding: '2%'
    },
    th: {
        ...getFont('OpenSans_m_16')
    },
    td: {
        textTransform: 'capitalize',
        ...getFont('OpenSans_r_16')

    },
    link: {
        color: COLORS.tomato,
        textDecorationLine: 'underline',
        ...getFont('OpenSans_r_16')
    },
    checkoutSection: {
        backgroundColor: COLORS.white,
        width: wp(100),
        height: 60,
        paddingHorizontal: '4%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
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
        width: wp(50),
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    checkoutBtnText: {
        color: COLORS.light,
        ...getFont('Poppins_m_15')
    }
});

