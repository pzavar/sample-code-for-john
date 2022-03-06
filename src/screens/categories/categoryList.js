import React, {useEffect, useState} from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CategoryCard from '../../components/card/categoryCard'
import { connect } from 'react-redux'
import { getAllCategories } from '../../store/actions'
import Header from '../../components/layout/header'
import { COLORS, hp } from '../../constants'
const CategoryList = props => {

    const [allCategories, setallCategories] = useState([])
    useEffect(() => {
        if(props.allCategories && props.allCategories.length>0){
            setallCategories(props.allCategories)
    }else{
         props.getAllCategories()
        
     }
    }, [props.allCategories.length])
    return (
       <>
        <Header/>
        <View style={styles.main}>

         <Text style={styles.title}>All Categories</Text>
       <FlatList
       data={allCategories}
       numColumns={2}
       renderItem={({item,index})=> <CategoryCard data={item} onPressCard={()=>props.navigation.navigate('mainShop',{catg:item })}/>}
       />

        </View>
       {/* <View style={{minHeight:hp(2)}}/> */}
       </>
       
         
    )
}

const mapSateToProps= props =>{
    const {allCategories}= props.catgAngPrdt
    // console.log(props.catgAngPrdt.length)
    return{
        allCategories
    }
}
export default connect(mapSateToProps, {getAllCategories})(CategoryList)

const styles = StyleSheet.create({
    main:{
        backgroundColor:COLORS.white,  borderTopWidth:1,
        paddingTop:15,
        borderTopColor:COLORS.gray2, paddingBottom:120,
        // minHeight:hp(100)
    //    paddingBottom:hp(20)
    },
    title:{
        fontSize:18,
        fontFamily:'Poppins-Medium',
        paddingBottom:10,
        paddingHorizontal:20
    }
})
