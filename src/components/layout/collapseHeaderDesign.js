import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {COLORS, getFont, ICONS, IMAGES, wp} from '../../constants';

const Header = (props) => {
  const {from} = props
  const data = [
    'special offer! - Get 50% off on vegitables!',
    'Get 40% discount on Bulk shopping!',
  ];
  const [activeOfferIndex, setactiveOfferIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  // const route = useRoute()
  const navigation = useNavigation()
  

  React.useEffect(() => {

    // console.log(`initializing interval`);
    const interval = setInterval(() => {
      let count = activeOfferIndex;
      setactiveOfferIndex(count < data.length ? count + 1 : 0);
      // console.log(activeOfferIndex)
    }, 2000);

    return () => {
      // console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, [activeOfferIndex]);

  return (
    <SafeAreaView style={{backgroundColor:COLORS.white}}>
      <View
        style={{
          backgroundColor: COLORS.darkBlue,
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...getFont('Montserrat_b_11'),
            textTransform: 'uppercase',
          }}>
          {' '}
          {data[activeOfferIndex]}{' '}
        </Text>
      </View>
      {/* <View>
            
            </View> */}
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: 'white',
          //  height:50,
          alignItems: 'center',
          flexDirection: 'row',
          padding: '4%',
          paddingVertical:5
        }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <ICONS.FontAwesome name={'bars'} size={25} color={COLORS.green} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home');
          }}>
          <Image source={IMAGES.logo} style={styles.logo} />
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{paddingRight:15}}>
          <ICONS.FontAwesome style={{fontWeight:'bold'}} name={'search'} size={25} color={COLORS.orange} />
            </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{marginTop: -15}}>
            <View
              style={{
                borderRadius: 50,
                backgroundColor: COLORS.black,
                zIndex: 10,
                marginLeft: 10,
                paddingHorizontal: 7,
                paddingVertical: 2,
              }}>
              <Text
                style={[
                  {
                    color: COLORS.white,
                    letterSpacing: 1.5,
                    textAlign: 'center',
                  },
                  getFont('Montserrat_m_14'),
                ]}>
                2
              </Text>
            </View>

            <ICONS.FontAwesome
              name={'shopping-basket'}
              size={22}
              color={COLORS.orange}
              style={{marginTop: -5}}
            />
          </View>
        </TouchableOpacity>
        </View>
      </View>

      {/* {from=='home'&&<View style={styles.searchBox}>
        <TextInput
          style={{height: 40, width: '80%'}}
          value={searchText}
          onChangeText={val => setSearchText(val)}
          placeholder="Search..."
          placeHolderTextColor={COLORS.gray}
        />
        <ICONS.AntDesign name={'search1'} size={20} color={COLORS.gray4} />
      </View>} */}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    width: wp(25),
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginLeft:40,
    transform: [{scale: 1.3}],
    // backgroundColor:'red'
  },
  searchBox: {
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor:COLORS.white,
    borderColor: COLORS.gray4,
    marginHorizontal: '4%',
    marginBottom: '6%',
    marginTop:-15,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
});
