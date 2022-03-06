import React,{useState} from 'react'
import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Text, View, Touchable } from 'react-native'
import TextField from '../../components/formFields/textField'
import { COLORS, wp, ICONS } from '../../constants'
import ProductCard from '../../components/card/productCard';
import { searchProductByName } from '../../store/actions';
import {connect} from 'react-redux'
import Header from '../../components/layout/header'

const Search = props => {
    const [searchinput, setsearchInput] = useState('')
    const [searchResult, setsearchResult] = useState([])
    const [searching, setsearching] = useState(false)
    const [reset, setReset] = useState(false)

    const handleSearch = () =>{
        setsearching(true)
        props.searchProductByName(searchinput, data=>setsearchResult(data))
    }

    const handleReset= () =>{
        setReset(true)
        setsearchInput('')
        setsearchResult([])
        setsearching(false)
    }

    return (
        <View style={styles.container}>
            <Header/>
            <View  style={styles.subHead}>
            {/* <TouchableOpacity onPress={()=>props.navigation.navigate('home')}>
                    <ICONS.AntDesign name={"arrowleft"} size={20} color={COLORS.tomato} />
                </TouchableOpacity> */}
                <View style={styles.searchBox}>

                <TextField style={styles.input} reset={reset} setReset={setReset} value={searchinput} onTermChange={(val)=>setsearchInput(val)} placeholder={'Search Here ...'} />
               {!!searchinput? <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>handleReset()}>
                    <ICONS.AntDesign name={"closecircle"} size={20} color={COLORS.gray2} />
                </TouchableOpacity>:
                <View style={{width:35}}/>
                }
                <TouchableHighlight underlayColor={COLORS.tomato} underlayColor={COLORS.tomato} onPress={()=> searchinput.length>2? handleSearch():{}} style={ [styles.searchbtn , searchinput.length<2 && {backgroundColor:COLORS.gray4}]}>
                    <ICONS.AntDesign name={"search1"} size={20} color={COLORS.white} />
                </TouchableHighlight>
                </View>
            </View>

            { !!searchinput  && searching && searchResult.length<1 && <View style={styles.emptyView}>
                <Text style={styles.emptyText}>No Product Found</Text>
                </View>  }
            
            {!!searchResult.length && 
            <>
                <Text style={styles.title}>Search Result</Text>    
              <FlatList
              numColumns={2}
              data={searchResult}
              renderItem={({ item, index, separators })=><ProductCard from ="deals" data={item}/>}
              keyExtractor={(item) => item.title+ new Date()}
              // extraData={selectedId}
              />
              </>
            }


        </View>
    )
}

const mapStateToProps= props=>{
    return {
        isLoading:props.catgAngPrdt.isLoading
    }
}
export default connect(mapStateToProps, {searchProductByName}) (Search)

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.white,
        flex:1
    },
    input:{
        width:wp(63),
        // paddingTop:
        // alignSelf:'center',
        borderBottomWidth:0,
        paddingVertical:0
    },
    subHead:{
        // backgroundColor:COLORS.light,
        flexDirection:'row',
        alignItems:'center',
        height:60,
        // flex:1,
        // width:wp(70),
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    searchbtn:{
        backgroundColor:COLORS.green,
        width:wp(20),
        height:45,
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:10
    },
    searchBox:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:COLORS.light2,
        borderRadius:10,
        marginTop:10,
        height:42,
        overflow:'hidden',
        alignItems:'center'
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
      },
      title:{
        fontSize:17,
        fontFamily:'Poppins-Medium',
        marginTop:10,
        paddingBottom:5,
        paddingHorizontal:20
    },
})
