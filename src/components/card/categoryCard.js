import React from 'react'
import { StyleSheet,Image, TouchableOpacity,  Text, ImageBackground } from 'react-native'
import {COLORS,  wp, IMAGES, hp, getFont} from '../../constants';
const CategoryCard = ({data, onPressCard}) => {
    const {name, image}= data
    // console.log(image)
    return (
        <TouchableOpacity
              onPress={()=>onPressCard()}
              style={styles.card}>
              <Image
                   source={data.image? {uri:data.image}: IMAGES.placeHolderImage}
                  style={{
                  width: 200,
                  height: 80,
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    card:{
        width: wp(100 / 2.2),
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 2.22,
    
        elevation: 3,
        height: 120,
        // alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp(2),
        padding: '3%',
        // zIndex:20,
        borderRadius:4
      },
      text: {
        ...getFont('OpenSans_m_14'),
        textTransform: 'uppercase',
        paddingBottom: 10,
        textAlign:'center'
      },
})
