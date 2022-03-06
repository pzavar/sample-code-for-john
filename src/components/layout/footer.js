import {transform} from '@babel/core';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  View,
  Touchable,
} from 'react-native';
import {COLORS, getFont, hp, ICONS, wp} from '../../constants';
const Footer = () => {
  const Link = (title, nav) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.linkText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor:COLORS.white}}>
      <View style={styles.FAQ}>
        <View style={[styles.FAQIconView]}>
          <ICONS.FontAwesome name={'truck'} color={COLORS.green} size={28} />
        </View>
        <Text style={styles.FAQText}>Free Shipping on order over $99</Text>
      </View>
      <View style={styles.FAQ}>
        <View style={[styles.FAQIconView]}>
          <ICONS.FontAwesome name={'phone'} color={COLORS.green} size={28} />
        </View>
        <Text style={styles.FAQText}>Have a Question?</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.FAQText, {marginTop: 5, letterSpacing: 0.3}]}>
          +92 213 82 UCAAZ (82229)
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.FAQ}>
        <View
          style={[
            styles.iconView,
            {
              borderColor: COLORS.green,
              width: wp(20),
              height: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 25,
            },
          ]}>
          <ICONS.FontAwesome name={'usd'} color={COLORS.green} size={28} />
        </View>
        <Text style={styles.FAQText}>100% MONEY BACK GUARANTEE</Text>
      </View>
      <View style={styles.FAQ}>
        <View style={[styles.FAQIconView]}>
          <ICONS.FontAwesome
            name={'briefcase'}
            color={COLORS.green}
            size={28}
          />
        </View>
        <Text style={[styles.FAQText]}>30 DAYS RETURN SERVICE</Text>
      </View>
        <View style={{height:hp(10)}}></View>
      {/* <View style={styles.downloadView}>
            <TouchableHighlight 
                onPress={()=>{}}
                style={styles.downloadBtn}
            >
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <ICONS.AntDesign name={'apple1'} color={COLORS.green} size={20}/>
                    <Text style={styles.downloadBtnText}>Download</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight 
                onPress={()=>{}}
                style={styles.downloadBtn}
            >
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <ICONS.AntDesign name={'android1'} color={COLORS.green} size={20}/>
                    <Text style={styles.downloadBtnText}>Download</Text>
                </View>
            </TouchableHighlight>
      </View> */}

      {/* <View style={styles.newsletterSection}>
        <Text style={styles.newsletterText}>Newsletter</Text>
        <Text style={styles.discountOffer}>Get Discount 30% OFF</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Your email address...'}
        />
        <TouchableHighlight
          style={styles.btn}
          underlayColor={COLORS.green}
          onPress={() => {}}>
          <View style={{flexDirection: 'row'}}>
            <ICONS.MaterialIcons
              name={'email'}
              color={COLORS.white}
              size={24}
            />
            <Text style={styles.btnText}>Subscribe</Text>
          </View>
        </TouchableHighlight>
      </View> */}

     {/*   <View style={styles.footer}>
         <View>
        <View>
            <Text style={styles.h2}>Shopping Guide</Text>
            {Link('Blog', '')}
            {Link('FAQs', '')}
            {Link('Payment', '')}
            {Link('Shipment', '')}
            {Link('Where is my order?', '')}
            {Link('Return Policy', '')}
          </View> *
           <View>
            <Text style={styles.h2}>Shopping Guide</Text>
            {Link('Blog', '')}
            {Link('FAQs', '')}
            {Link('Payment', '')}
            {Link('Shipment', '')}
            {Link('Where is my order?', '')}
            {Link('Return Policy', '')}
          </View>
        </View> 

         <View>
          <Text style={styles.h2}>Shopping Guide</Text>
          {Link('Blog', '')}
          {Link('FAQs', '')}
          {Link('Payment', '')}
          {Link('Shipment', '')}
          {Link('Where is my order?', '')}
          {Link('Return Policy', '')}
        </View> */}

        {/* <View>
          <Text style={styles.h2}>Contact Us</Text>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
              alignItems: 'center',
            }}>
            <View style={styles.iconView}>
              <ICONS.Ionicons
                name={'location'}
                color={COLORS.lightGray}
                size={20}
              />
            </View>
            <Text style={styles.contactInfoText}>
              Head Office: Mezzanine floor, 5-C, Khayaban-e-Ittehad, Phase VII,
              DHA, Karachi -75500
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
              alignItems: 'center',
            }}>
            <View style={styles.iconView}>
              <ICONS.FontAwesome
                name={'phone'}
                color={COLORS.lightGray}
                size={20}
              />
            </View>
            <Text style={styles.contactInfoText}> +213 8888 900</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
              alignItems: 'center',
            }}>
            <View style={styles.iconView}>
              <ICONS.MaterialIcons
                name={'email'}
                color={COLORS.lightGray}
                size={20}
              />
            </View>
            <Text style={styles.contactInfoText}>support@ucaaz.com</Text>
          </View>
        </View>
      </View> */}
      {/* <View style={styles.footerBottom}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.facebook}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.FontAwesome
              name={'facebook'}
              color={COLORS.white}
              size={18}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.twitter}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.FontAwesome
              name={'twitter'}
              color={COLORS.white}
              size={18}
            />
          </TouchableHighlight>
          {/* <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.googlePlus}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.AntDesign
              name={'googleplus'}
              color={COLORS.white}
              size={18}
            />
          </TouchableHighlight> */}
          {/* <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.wifi}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.Entypo
              style={{transform: [{rotate: '45deg'}]}}
              name={'signal'}
              color={COLORS.white}
              size={18}
            />
          </TouchableHighlight> */}
          {/* <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.pinterest}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.Entypo name={'pinterest'} color={COLORS.white} size={18} />
          </TouchableHighlight> 
          <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.linkedIn}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.Entypo name={'linkedin'} color={COLORS.white} size={18} />
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.socialLink, {backgroundColor: COLORS.youTube}]}
            onPress={() => {}}
            underlayColor={COLORS.green}>
            <ICONS.Entypo name={'youtube'} color={COLORS.white} size={18} />
          </TouchableHighlight>
        </View>
        <Text style={styles.copyRightText}>
          © 2021 Ucaaz.com. All Rights Reserved.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
            justifyContent: 'center',
          }}>
          <Image
            style={styles.paymentCardImg}
            source={{
              uri: 'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-3.png ',
            }}
          />
          <Image
            style={styles.paymentCardImg}
            source={{
              uri: 'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-1.png ',
            }}
          />
          <Image
            style={styles.paymentCardImg}
            source={{
              uri: 'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-2.png ',
            }}
          />
          <Image
            style={styles.paymentCardImg}
            source={{
              uri: 'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-4.png ',
            }}
          />
        </View>
      </View> */}

      {/* https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-3.png */}
      {/* https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-1.png */}
      {/* https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-2.png */}
      {/* https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/payment-4.png */}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  FAQ: {
    backgroundColor: COLORS.white,
    height: 250,
    borderTopWidth: 0.3,
    borderTopColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:10
    
  },
  FAQIconView: {
    borderColor: COLORS.green,
    width:80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 50,
  },

  downloadView:{
        backgroundColor:COLORS.green,
        height:250,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:60
  },
  downloadBtn:{
      backgroundColor:COLORS.white,
      width:wp(80),
      height:50,
      marginLeft:-10,
      marginBottom:10,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
    //   op/acity:0.9
  },
  downloadBtnText:{
    color:COLORS.green,
    textTransform:'uppercase',
    ...getFont('Poppins_b_16'),
    fontWeight:'bold',
    marginLeft:10
  },

  newsletterSection: {
    backgroundColor: COLORS.black1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '100%',
  },

  newsletterText: {
    color: COLORS.white,
    textTransform: 'uppercase',
    ...getFont('OpenSans_m_20'), //oswlad
  },
  discountOffer: {
    color: COLORS.green,
    textTransform: 'uppercase',
    ...getFont('Montserrat_b_20'),
    marginBottom: '4%',
    marginTop: 10,
  },
  footer: {
    backgroundColor: COLORS.black2,
    // alignItems:'center',
    width: wp(101),
    padding: '6%',
    paddingVertical: '9%',
  },
  linkText: {
    color: COLORS.lightGray,
    fontSize: 16,
    marginBottom: 15,
    // textAlign:'center'
  },
  h2: {
    // textAlign:'center',
    color: COLORS.tomato,
    ...getFont('Poppins_b_18'),
    textTransform: 'uppercase',
    marginVertical: 16,
  },
  btn: {
    backgroundColor: COLORS.orange,
    width: wp(50),
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.white,
    textTransform: 'uppercase',
    ...getFont('OpenSans_b_18'),
    marginLeft: 5,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: COLORS.white,
    height: 55,
    marginTop: '5%',
    marginBottom: '4%',
    width: wp(80),
    borderRadius: 50,
    paddingHorizontal: '5%',
    ...getFont('OpenSans_r_18'),
  },
  iconView: {
    marginRight: 10,
    borderWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: COLORS.lightGray,
    borderRadius: 50,
    padding: 10,
  },
  contactInfoText: {
    color: COLORS.lightGray,
    // fontSize: 16,
    marginBottom: 15,
    ...getFont('OpenSans_r_14'),
    width: '80%',
    marginTop: 5,
  },

  footerBottom: {
    backgroundColor: COLORS.black2,
    borderTopColor: COLORS.gray,
    borderTopWidth: 0.5,
    // alignItems:'center',
    width: wp(101),
    // padding:'6%',
    paddingVertical: '9%',
  },
  socialLink: {
    width: 30,
    height: 30,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom:50
  },

  copyRightText: {
    color: COLORS.lightGray,
    textAlign: 'center',
    marginVertical: '5%',
    ...getFont('OpenSans_m_15'),
  },
  paymentCardImg: {
    width: 50,
    resizeMode: 'contain',
    marginLeft: 10,
    height: 40,
  },
  FAQText: {
    textTransform: 'uppercase',
    marginTop: 10,
    letterSpacing: -0.5,
    textAlign:'center',
    alignSelf:'center',
    ...getFont('Poppins_m_16'),
    color: COLORS.black1,
  },
});
