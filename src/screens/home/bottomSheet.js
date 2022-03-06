import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Modal from "react-native-modal";
import { COLORS, hp, ICONS, wp } from '../../constants';
import { connect } from 'react-redux'
import { getCustomerAddress } from '../../store/actions';
import Loader from '../../components/Loader'
import { useNavigation } from '@react-navigation/native';

const SaveLocationList = props => {

    const [addressList, setaddressList] = useState([])
    const [selectedLocation, setselectedLocation] = useState('')
    const navigation = useNavigation()

    useEffect(() => {

        if (Object.keys(props.userAccessKey).length) {
            if (props.address.length > 0 && props.address !== addressList) {
                
                setaddressList(props.addressList)
            } else {

                props.getCustomerAddress(data => {
                    // console.log(data)
                    setaddressList(data)
                })
            }
        } else {
            if (props.cacheAddress.length) {
                setaddressList(props.cacheAddress)
            }
        }


        if (!Object.keys(props.userAccessKey).length && !props.cacheAddress.length) {
            setaddressList([])
        }

    }, [props.address.length, Object.keys(props.userAccessKey).length, props.cacheAddress.length])

    const Item = (item, index) => (
        <TouchableOpacity
            onPress={() => props.selectLocation(item)}
            key={index}
            style={[styles.btn, { backgroundColor: COLORS.light }]}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={[styles.itemText, { color: COLORS.gray2 }]}>{item.address}</Text>
            </View>
        </TouchableOpacity>
    )

    return (

        <Modal
            animationType='slide'
            transparent={true}
            visible={props.showModal}>

            <View style={{ backgroundColor: COLORS.white, height: hp(75), elevation: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: hp(38) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '5%' }}>
                    <Text style={styles.title}>Select Location</Text>
                    <TouchableOpacity
                        onPress={() => props.setShowModal()}
                    // style={{alignSelf:'flex-end'}}
                    >
                        <ICONS.AntDesign name={'closecircle'} size={20} color={COLORS.green} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={{ paddingBottom: hp(30), height: 'auto', paddingLeft: '5%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.setShowModal()
                                props.setCurrentLocation()
                            }}
                            style={[styles.btn, { backgroundColor: COLORS.tomatoShade01 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <ICONS.FontAwesome5 name={'location-arrow'} color={COLORS.tomatoShade04} size={20} />
                                <Text style={[styles.itemText, { color: COLORS.tomatoShade08 }]}>   Current Location</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                props.setShowModal()
                                navigation.navigate('location')
                            }}
                            style={styles.btn}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <ICONS.Entypo name={'plus'} style={{ marginTop: -3 }} color={COLORS.greenShade04} size={24} />
                                <Text style={styles.itemText}>  Add New Location</Text>
                            </View>
                        </TouchableOpacity>
                        {props.isLoading && <Loader />}
                        {addressList.map((item, index) => Item(item, index))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const mapStateToProps = props => {
    const { address, isLoading, cacheAddress } = props.user
    const { userAccessKey } = props.auth
    console.log("props.user===========================================", cacheAddress)
    console.log("props.useraCCESS kEY===========================================", userAccessKey)
    return {
        address, isLoading, userAccessKey, cacheAddress
    }

}

export default connect(mapStateToProps, { getCustomerAddress })(SaveLocationList)

const styles = StyleSheet.create({
    container: {
        height: 100
    },
    itemText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        // marginLeft:5,
        // color:COLORS.green
        color: COLORS.greenShade08
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: COLORS.green
    },
    btn: {
        backgroundColor: COLORS.greenLightShade01,
        // backgroundColor:'#afd5db',
        // elevation:2,
        marginBottom: 10,
        paddingHorizontal: '3%', paddingVertical: '4%', width: wp(90), borderRadius: 10,
    }
})
