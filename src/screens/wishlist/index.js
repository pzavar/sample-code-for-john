import React,{useState, useEffect} from 'react'
import { FlatList, BackHandler,  TouchableOpacity,ScrollView,  StyleSheet, Text, View, SafeAreaView, Platform, TouchableHighlight } from 'react-native'
import {COLORS,getFont, wp, hp, ICONS,  IMAGES} from '../../constants'
import WishListCard from './card'
import { useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import { getAllWishlist,  deleteWishListById  } from '../../store/actions'
const Wishlist = props => {
// const [selectAll, setSelectAll] = useState(false)

const [favouriteData, setfavouriteData] = useState([])
const [getData, setData] = useState(false)

const navigation = useNavigation()
useEffect(() => {
    if( !favouriteData.length){
        props.getAllWishlist((data)=> {
            setData(false)
            setfavouriteData(data)
        })
    }
  if(favouriteData.length !== props.favouriteList.length){
      setfavouriteData(props.favouriteList)
  }
//   const backHandler = BackHandler.addEventListener(
//     "hardwareBackPress",
//     ()=>{
//         setfavouriteData([])
//         setData(false)
//     }
//   );

//   return () => backHandler.remove();
}, [props.favouriteList.length,// favouriteData.length
])
    

    return (
        <View style={[{backgroundColor:COLORS.light, paddingTop:Platform.OS==='ios'?40:0} ]} >
            {/* <Header/> */}
            <View style={[styles.header]}>
                <TouchableOpacity onPress={() => {
                    // setfavouriteData([])
                    // setData(false)
                    navigation.goBack()}}>
                    <View style={{flexDirection:'row'}}>
                    <ICONS.AntDesign name={'arrowleft'} size={18} color={COLORS.tomato} />
                    {/* <Text>  Back</Text> */}
                    </View>
                </TouchableOpacity>   

                <Text style={styles.h1}>Wishlist</Text>

             
                <View style={{width:0}}/>
                </View>
                <ScrollView style={{ backgroundColor:COLORS.light}}>
            <View style={styles.cardSection}>
              
                {favouriteData.map((item,index)=><WishListCard key={index} index={index} data={item} setList={data=>setfavouriteData(data)}/>)}
                </View>
                </ScrollView>
           
         
            
        </View>
    )
}

const mapStateToProps= props=>{
    const {favouriteList} = props.favourite
    console.log("favouriteListr-----------------------", favouriteList)
    return {
        favouriteList
    }
}

export default connect(mapStateToProps, {getAllWishlist, deleteWishListById} )(Wishlist)

const styles = StyleSheet.create({
    cardSection:{
        alignItems:'center',
        width:wp(100),
        minHeight:hp(100),
        // backgroundColor:COLORS.white
    //    marginTop:'5%'
        flex:1
    },
    h1:{
        ...getFont('Poppins_m_18'),
        // fontWeight:'bold',
        // paddingTop:'6%',
        // paddingLeft:'1%',
        textAlign:'center',
        paddingBottom:0,
        letterSpacing:0.4,
        color:COLORS.green,
        marginLeft:-wp(5)
    

      },
      header:{
        width:wp(100),
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
       height:60,
    //    elevation:3,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 1,
       },
       shadowOpacity: 0.22,
       shadowRadius: 2.22,
       borderBottomWidth:1,
        borderBottomColor:COLORS.light2,
       

       
       backgroundColor:'white',
       justifyContent:'space-between'
      },
      checkoutSection:{
          backgroundColor:COLORS.white,
          width:wp(100),
          height:80,
          paddingHorizontal:'4%',
          flexDirection:'row',
          position:'absolute',
          bottom:60,
        //   backgroundColor:'yellow',
          justifyContent:'space-between',
          alignItems:'center',
          elevation:3,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 1,
       },
       shadowOpacity: 0.22,
       shadowRadius: 2.22,
       borderBottomWidth:1,
       borderBottomColor:COLORS.light2,
      },
      checkoutBtn:{
          backgroundColor:COLORS.green,
          width:wp(30),
          height:'70%',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10
      },
      checkoutBtnText:{
          color:COLORS.light,
          ...getFont('OpenSans_b_18')
      }
})
