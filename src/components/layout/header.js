import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS, getFont, ICONS, IMAGES, wp } from '../../constants';
import FlashTicker from './flashTicker';
import { connect } from 'react-redux'


const Header = (props) => {
  const { from } = props
  const [_scrollValue, setscrollValue] = useState(0)
  const [favouriteCount, setfavouriteCount] = useState(0)
  const [cartCount, setcartCount] = useState(0)
  const navigation = useNavigation()
  const handleReset = props.handleReset

  useEffect(() => {
    props.scrollVal && setscrollValue(props.scrollVal)
    if (props.favouriteList.length !== favouriteCount) {
      setfavouriteCount(props.favouriteList.length)
    }
    if (props.cartList.length !== cartCount) {
      setcartCount(props.cartList.length)
    }

  }, [props.scrollVal, props.favouriteList.length, props.cartList.length])



  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <FlashTicker />

      <View
        style={{
          backgroundColor: 'white',
          height: props.scrollVal > 100 ? 60 : 70,
          elevation: 10,
          width: wp(100),
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={styles.touchable}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => {
            navigation.toggleDrawer ?
              navigation.toggleDrawer() :
              navigation.goBack ?
                navigation.goBack() :
                navigation.navigate('drawer');
            handleReset && handleReset()

          }}>
          {
            navigation.toggleDrawer ?
              <ICONS.Feather name={'menu'} size={22} color={COLORS.green} /> :
              <ICONS.Feather name={'arrow-left'} size={25} color={COLORS.tomato} />
          }
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('search');
            handleReset && handleReset()
          }}>
          <ICONS.AntDesign
            name={'search1'}
            size={22}
            color={COLORS.dark}
            style={{ marginTop: -5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchable, {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }]}
          onPress={() => {
            navigation.navigate('home');
            handleReset && handleReset()
          }}>
          <Image source={IMAGES.logo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            !!Object.keys(props.AccessKey).length &&
            navigation.navigate('wishlist');
            handleReset && handleReset();
          }}>
          <View style={{ marginTop: -15 }}>
            {!!Object.keys(props.AccessKey).length && <View
              style={{
                borderRadius: 50,
                backgroundColor: COLORS.black,
                zIndex: 10,
                marginLeft: 10,
                width: 20,
                paddingVertical: 2,
                position: 'absolute',
                top: 4,
                right: -6
              }}>
              <Text
                style={[
                  {
                    color: COLORS.white,
                    letterSpacing: 1.5,
                    textAlign: 'center',
                  },
                  getFont('Montserrat_m_12'),
                ]}>
                {favouriteCount}
              </Text>
            </View>
            }

            <ICONS.AntDesign
              name={'hearto'}
              size={22}
              color={!!Object.keys(props.AccessKey).length ? COLORS.orange : COLORS.disabled}
              style={{ marginTop: 15 }}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <View style={[styles.touchable, { paddingBottom: 15 }]}>
            <View
              style={{
                borderRadius: 50,
                backgroundColor: COLORS.black,
                zIndex: 10,
                marginLeft: 10,
                width: 20,
                paddingVertical: 2,
                position: 'absolute',
                top: 10,
                right: 5
              }}>
              <Text
                style={[
                  {
                    color: COLORS.white,
                    letterSpacing: 1.5,
                    textAlign: 'center',
                  },
                  getFont('Montserrat_m_12'),
                ]}>
                {cartCount}
              </Text>
            </View>

            <ICONS.AntDesign
              name={'shoppingcart'}
              size={26}
              color={COLORS.orange}
              style={{ marginTop: 15 }}
            />
          </View>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

const mapStateToProps = props => {
  console.log("!Object.keys(props.AccessKey).length", Object.keys(props.auth.userAccessKey).length)
  return {
    favouriteList: props.favourite.favouriteList,
    cartList: props.cart.cartList,
    AccessKey: props.auth.userAccessKey
  }
}

export default connect(mapStateToProps, null)(Header);

const styles = StyleSheet.create({
  logo: {
    width: wp(32),
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: 10,
    transform: [{ scale: 1.3 }],
    // marginLeft:wp(25)
    // flex:3
    // backgroundColor:'red'
  },
  searchBox: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray4,
    marginHorizontal: '4%',
    marginBottom: '6%',
    // marginTop:-15,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  touchable: { height: '100%', alignItems: 'center', justifyContent: 'center', width: 50, }
});
