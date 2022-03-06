import React ,{useState,useRef, useEffect} from 'react';
import { View, Text, ScrollView, BackHandler, StyleSheet, useWindowDimensions } from 'react-native';

import {COLORS, getFont, hp, wp} from '../../constants'
import Header from '../../components/layout/header'
import { connect } from 'react-redux';
import {getSubCatg , getHomePageCatg,  getProductListByCatgId, getAllCategories} from '../../store/actions'
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import ProductCard from '../../components/card/productCard';
import { filterCategory } from '../../util';


const  MainShop = props => {

  const [allCategories, setallCategories] = useState([])
  const [subCatgList, setsubCatgList] = useState([])
  const [productList, setproductList] = useState([])
  const [activeCatg, setactiveCatg] = useState('')
  const [activeSubCatg, setactiveSubCatg] = useState('')
  const scrollRef = useRef(null)
  const subCatgScrollRef = useRef(null)


  useEffect(()=>{
    if(!props.homePageCatg.length){
      props.getHomePageCatg((temp)=>{
        let data =filterCategory(temp)
        setallCategories(data);
       !!activeCatg &&  handleCategoryPress(data[0], 0)
      }
       )
    }else{
      setallCategories(props.homePageCatg)
   
      handleCategoryPress(props.homePageCatg[0],0)
      // console.log("props.allCategories",props.allCategories)
    }
    if(props.route.params && props.route.params.catg){
      setactiveCatg(props.route.params.catg.id)
      let index= allCategories.findIndex(item=>item.id=== props.route.params.catg.id)
      handleCategoryPress(props.route.params.catg, index)
      // handleSubCatg(props.route.params.catg)
    }

  },[props.getAllCategories.length , props.route.params && props.route.params.catg , props.martCode])


 


  const handleSubCatg=(item,index)=>{
      // scrollRef.current.scrollTo({x:})
      subCatgScrollRef.current.scrollTo({x:120*index})

         setactiveSubCatg(item)
        props.getProductListByCatgId(item.id,(prdtList)=>{
          console.log("product list ------------------------------------------", prdtList)
          setproductList(prdtList)
        })
     
  
  }

  const handleCategoryPress= (item ,index)=>{
    setactiveCatg(item.id)
    scrollRef.current.scrollTo({x:120*index})

    props.getSubCatg(item.id , (temp)=>{
  
      let data = filterCategory(temp)
      setsubCatgList(data)
      setactiveSubCatg( data[0])
      console.log(JSON.stringify(temp))

      if(data && data.length>0){
        props.getProductListByCatgId(data[0].id,(prdtList)=>{
          setproductList(prdtList)
        })
      }
  })
  }

  // console.log("sub category fir item", activeSubCatg)


  const renderCategorgyTab= ()=>{
    return(
      <View style={styles.mainTab}>

      <ScrollView 
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      horizontal >
        {allCategories.map((item,index)=>(
          <TouchableOpacity
          key={index}
          onPress={()=>handleCategoryPress(item, index) }
           style={[styles.catgTabBtn, activeCatg ===item.id && styles.activeCatgBtn ]}>
            <Text style={[styles.btnText, activeCatg === item.id && styles.activeCatgBtnText]}>{item.name}</Text>
           </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    )
  }

  
  const renderSubCategorgyTab= ()=>{
    return(
      <View style={styles.mainTab}>

      <ScrollView 
      ref={subCatgScrollRef}
      showsHorizontalScrollIndicator={false} horizontal >
        {subCatgList.map((item,index)=>(
          <TouchableOpacity
          key={index}
          onPress={()=>handleSubCatg(item,index) }
           style={[styles.catgTabBtn, activeSubCatg.id ===item.id && styles.activeCatgBtn ]}>
            <Text style={[styles.btnText, activeSubCatg.id === item.id && styles.activeCatgBtnText]}>{item.name}</Text>
           </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    )
  }

  const renderProductList =()=>(
  

<View style={styles.main}>

<Text style={styles.title}>{activeSubCatg.name}</Text>
     {productList.length>0? <FlatList
        numColumns={2}
        data={productList}
        renderItem={({item,index}) => <ProductCard data={item} index={index} from="shop"/> }
      />:
      <View style={styles.emptyView}>
      <Text style={styles.emptyText}>No Product Available</Text>
      </View>
    }
    </View>
  )


  return (
    <>
    <Header/>
      {renderCategorgyTab()}
      {renderSubCategorgyTab()}
      {renderProductList()}

    </>
  );
}

const mapStateToProps= props=>{
  const {allCategories }=props.catgAngPrdt
  const {homePageCatg} = props.home
  return {
    allCategories,
    homePageCatg,
    martCode:props.user.martCode
  }
}
export default connect( mapStateToProps, {getSubCatg , getHomePageCatg, getProductListByCatgId, getAllCategories}) (MainShop)


const styles = StyleSheet.create({
  mainTab:{
    height:50,
    backgroundColor:COLORS.white,
    marginTop:2,
    paddingHorizontal:5
  },
  catgTabBtn:{
    height:'65%',
    marginTop:7,
    borderRadius:10,
    // flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20,
    //  backgroundColor:'pink'
  },
  activeCatgBtn:{
    backgroundColor:COLORS.tomato
  },
  btnText:{
    fontFamily:'Poppins-Regular'
  },
  activeCatgBtnText:{
    color:COLORS.white
  },
  main:{
    backgroundColor:COLORS.white,
    borderTopWidth:10,
    borderTopColor:COLORS.light,
    paddingTop:20,
    flex:1
},
title:{
    fontSize:17,
    fontFamily:'Poppins-Medium',
    marginTop:-10,
    paddingBottom:5,
    paddingHorizontal:20
},
 emptyText:{
   color:COLORS.light2,
   fontSize:20,
   fontFamily:'Poppins-Bold',
   textAlign:'center'
 },
 emptyView:{
   flex:1,
    alignItems:'center',
    justifyContent:'center'
 }

})