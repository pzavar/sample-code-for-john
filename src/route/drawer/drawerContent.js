import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';


import { IMAGES,ICONS, COLORS, getFont, wp } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { logout,getProfileById } from '../../store/actions';
const drawerIcon = {
  aboutUs: require('../../assets/appicons-2/aboutUs.png'),
  cart: require('../../assets/appicons-2/cart.png'),
  franchisePartner: require('../../assets/appicons-2/franchisePartner.png'),
  location: require('../../assets/appicons-2/location.png'),
  login: require('../../assets/appicons-2/login.png'),
  logout: require('../../assets/appicons-2/logout.png'),
  contactUs: require('../../assets/appicons-2/phone.png'),
  productPartner: require('../../assets/appicons-2/productPartner.png'),
  profile: require('../../assets/appicons-2/profile.png'),
  shop: require('../../assets/appicons-2/shop.png')
}

const DrawerContent = props => {
  const [listDataSource, setListDataSource] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const navigation = useNavigation()
  const [profileInfo, setprofileInfo] = useState(false)
  const {profile, userAccessKey, getProfileById} =props
  const [activeURL, setactiveURL] = useState('')
  let socialLinks={
    twitter:'https://twitter.com/UcaazM',
    facebook:'https://www.facebook.com/ucaazpk/',
    youtube:'https://www.youtube.com/channel/UC8dSSirJFx544x4nr38mSOA',
    instagram:'https://www.instagram.com/ucaazpk/'
  }

  const handleLogout = () => {
    props.logout(() => {
      setisLoggedIn(false);
      navigation.navigate('home')
    })
  }

  const openOptions = [
    
    {
      isExpanded: false,
      category_name: 'Contact Us',
      iconName: drawerIcon.contactUs,
      route: 'contact'
    },
    {
      isExpanded: false,
      category_name: 'About Us',
      subcategory: [],
      iconName: drawerIcon.aboutUs,
      method: () => navigation.navigate('aboutUs')
    },
    {
      isExpanded: false,
      category_name: 'Franchise Partner',
      subcategory: [],
      iconName: drawerIcon.franchisePartner,
      method: () => navigation.navigate('franchisePartner')
    },
    {
      isExpanded: false,
      category_name: 'Product Partner',
      subcategory: [],
      iconName: drawerIcon.productPartner,
      method: () => navigation.navigate('productPartner')
    },

  ];
  const loginOptions = [
    {
      isExpanded: false,
      category_name: 'Profile',
      iconName: drawerIcon.profile,
      route: 'profile'
    },
    
    {
      isExpanded: false,
      category_name: 'My Order',
      iconName: drawerIcon.cart,
      route: 'myOrder'
    },

    {
      isExpanded: false,
      category_name: 'Cart',
      iconName: drawerIcon.cart,
      route: 'cart'
    },
    {
      isExpanded: false,
      category_name: 'Contact Us',
      iconName: drawerIcon.contactUs,
      route: 'contact'
    },
   
    {
      isExpanded: false,
      category_name: 'About Us',
      subcategory: [],
      iconName: drawerIcon.aboutUs,
      method: () => navigation.navigate('aboutUs')
    },
    {
      isExpanded: false,
      category_name: 'Franchise Partner',
      subcategory: [],
      iconName: drawerIcon.franchisePartner,
      method: () => navigation.navigate('franchisePartner')
    },
    {
      isExpanded: false,
      category_name: 'Product Partner',
      subcategory: [],
      iconName: drawerIcon.productPartner,
      method: () => navigation.navigate('productPartner')
    },
    {
      iconName: drawerIcon.logout,
      isExpanded: false,
      category_name: 'LogOut',
      method: () => handleLogout()
    },

  ];


  useEffect(async () => {
  
    let isUserExist = Object.keys(userAccessKey).length > 0 ? true : false
    setisLoggedIn(isUserExist)
    setListDataSource(isUserExist ? loginOptions : openOptions)
    
    if(isUserExist && !Object.keys(profile).length){
      getProfileById()
    }
  }, [userAccessKey, Object.keys(profile).length])

  // console.log("profile--------------", props.profile)

  const ListItem = (item, index) => {

    return (

      <TouchableOpacity
        key={index}
        onPress={() => item.route ?
          navigation.navigate(item.route)
          : item.method ? item.method() : {}}
        style={styles.item}>

        <View style={{ flexDirection: 'row' }}>
          <Image
            source={item.iconName}
            style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: '3%' }} />

          <Text style={styles.itemText}> {item.category_name}</Text>

        </View>
      </TouchableOpacity>

    );
  };

  const renderSocialLinks=()=>(

    <View style={styles.footerBottom}>
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableHighlight
        style={[styles.socialLink
          // , {backgroundColor: COLORS.facebook}
        ]}
        onPress={() => navigation.navigate('facebook')}
        underlayColor={COLORS.green}>
        <ICONS.FontAwesome
          name={'facebook'}
          color={  COLORS.tomato}
          size={22}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.socialLink
          // , {backgroundColor: COLORS.twitter}
        ]}
        onPress={() => navigation.navigate('twitter')}
        underlayColor={COLORS.green}>
        <ICONS.FontAwesome
          name={'twitter'}
          color={  COLORS.tomato}
          size={22}
        />
      </TouchableHighlight>
            {/* <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.1, y: 4.0}}
                locations={[0,0.1, 0.4,0.6,0.8]}
                colors={['#515BD4', '#8134AF', '#DD2A7B','#FEDA77','#F58529']}
                style={[styles.socialLink]}> */}
      <TouchableHighlight
       style={{width:30,height:30, justifyContent:'center', alignItems:'center', borderRadius:4}}
        onPress={() => navigation.navigate('instagram')}
        underlayColor={COLORS.green}>
                 <ICONS.AntDesign name={'instagram'}   color={  COLORS.tomato} size={22} />
        </TouchableHighlight>
            {/* </LinearGradient> */}
  
      <TouchableHighlight
        style={[styles.socialLink
          // , {backgroundColor: COLORS.youTube}
        ]}
        onPress={() => navigation.navigate('youtube')}
        underlayColor={COLORS.green}>
        <ICONS.Entypo name={'youtube'}   color={  COLORS.tomato} size={22} />
      </TouchableHighlight>
    </View>
    </View>
  
  )


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{
          backgroundColor: COLORS.green,
          paddingTop: 25, paddingBottom: 30,
          alignItems: 'center',
        }}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.toggleDrawer(),

                navigation.navigate('home');
            }}>
            <Image source={IMAGES.logowhite} style={styles.logo} />
          </TouchableWithoutFeedback>

          {isLoggedIn ? <View style={{ alignItems: 'center' }}>
            <Text style={{ color: COLORS.tomato, fontSize: 20, fontWeight: '600' }}>{profile.first_name} {profile.last_name}</Text>
        {!!profile.email &&   <Text style={{ color: COLORS.white, fontSize: 16 }}>{profile.email}</Text>}
           {!!profile.phone && <Text style={{ color: COLORS.white, fontSize: 16 }}>{profile.phone}</Text>}
          </View> :
            <Text style={styles.caption}>
              <Text onPress={() => props.navigation.navigate('signup')} style={styles.linkText}> Sign up </Text>
              <Text style={{ fontSize: 22, color: COLORS.tomato }}>/</Text>
              <Text onPress={() => props.navigation.navigate('login')} style={styles.linkText}> Login</Text> now to start enjoying shopping </Text>
          }
        </View>
        {listDataSource.map((item, key) => ListItem(item, key))}

        <View style={{ paddingBottom: '40%' }} >
            {renderSocialLinks()}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = props => {
  const { userAccessKey, isLoading } = props.auth
  // console.log("drwaer user accesskey>>>>>>>>>>>>>>>>>>>>>>>.",userAccessKey)
  const { profile } = props.user
  return { userAccessKey, isLoading, profile }
}
export default connect(mapStateToProps, { logout, getProfileById })(DrawerContent)

const styles = StyleSheet.create({
  linkText: { color: COLORS.tomato, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' },
  caption: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    letterSpacing: 0.88,
    width: '60%',
    lineHeight: 24,
    marginTop: 10
  },
  logo: {
    width: 100,

    marginVertical: 20,
    height: 80,
    transform: [{ scale: 1.3 }],
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  item: {
    padding: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.3,
    // alignItems:'center',
    borderBottomColor: '#ccc',
  },
  itemText: {
    ...getFont('OpenSans_m_15'),
    color: COLORS.gray,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  text: {
    ...getFont('OpenSans_m_18'),
    letterSpacing: 0.25,
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    // paddingBottom: '4%',
    textTransform: 'capitalize',
    color: COLORS.gray3,
  },
  subMenuItemText: {
    ...getFont('OpenSans_r_16'),
    letterSpacing: 0.25,
    paddingHorizontal: '6%',
    // paddingBottom: '4%',
    textTransform: 'capitalize',
    color: COLORS.gray3,
  },
  seperator: {
    height: 0.5,
    backgroundColor: '#c8c8c8',
  },
  footerBottom: {
   
    paddingVertical: '9%',
  },
  socialLink: {
    width: 30,
    height: 30,
    borderRadius: 4,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom:50
  },

});
