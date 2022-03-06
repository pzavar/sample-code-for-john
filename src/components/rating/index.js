import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, ICONS } from '../../constants'

const Rating = ({rating}) => {
    
    return (
        <View style={{flexDirection:'row', marginBottom:10}}>
            <ICONS.FontAwesome 
                name={rating===0?'star-o': 'star'}
                size={16} 
                color={rating>0? COLORS.green:COLORS.lightGray}/>
          
            <ICONS.FontAwesome 
                name={rating<2 ? 'star-o': rating===1.5? 'star-half-empty': 'star'}
                size={16} 
                color={rating>1? COLORS.green:COLORS.lightGray}/>  
          
            <ICONS.FontAwesome 
                name={rating<3? 'star-o': rating===2.5? 'star-half-empty': 'star'}
                size={16} 
                color={rating>2? COLORS.green:COLORS.lightGray}/>
          
            <ICONS.FontAwesome 
                name={rating<4 ? 'star-o': rating===3.5? 'star-half-empty': 'star'}
                size={16} 
                color={rating>3? COLORS.green:COLORS.lightGray}/>
          
            <ICONS.FontAwesome 
                name={rating<5? 'star-o': rating===4.5? 'star-half-empty': 'star'}
                size={16} 
                color={rating>4? COLORS.green:COLORS.lightGray}/>
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({})
