import React, { useEffect ,useRef, useState} from 'react';
import {TouchableOpacity,ScrollView, StyleSheet, Text, View} from 'react-native';
import {ICONS, COLORS, hp, getFont, wp} from '../../constants';
import ProductCard from '../card/productCard';
import {connect} from 'react-redux'
import { getBestSeller } from '../../store/actions';

const Slider2 = (props) => {
  const [data, setdata] = useState([])
  const ref = useRef(null)
  const [pageLength, setpageLength] = useState(0)
  const [activePage, setactivePage] = useState(1)


  useEffect(() => {
    if(props.bestSeller && props.bestSeller.length){
      // console.log(props.bestSeller)
      setdata(props.bestSeller)
      setpageLength(props.bestSeller.length/2)
    }else{
      props.getBestSeller()
    }
  }, [props.bestSeller.length])

  const scrollLeft = ()=>{
    let page= activePage<pageLength? activePage+1:0
    ref.current.scrollTo({x: page * wp(100), y: 0, animated: true})
    setactivePage(page)
  }

  const scrollRight = ()=>{
    let page= activePage>1?activePage-1:pageLength
    ref.current.scrollTo({x: page * wp(100), y: 0, animated: true})
    setactivePage(page)
  }


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',paddingHorizontal:'4%',  alignItems:'center', justifyContent:'space-between'}}>
        <TouchableOpacity
          onPress={() => scrollRight()}
          style={[
            styles.arrowbtn,
            // {position: 'absolute', right: 10, top: 70, zIndex: 100},
          ]}>
          <ICONS.AntDesign name={'left'} size={20} color={COLORS.white} />
        </TouchableOpacity>
        <View>
        <Text style={styles.h}>Best Seller</Text>
        <Text style={styles.caption}>So you get to know better</Text>
        </View>
      
        <TouchableOpacity
          onPress={() => scrollLeft()}
          style={[
            styles.arrowbtn,
            // {position: 'absolute', right: 10, top: 70, zIndex: 100},
          ]}>
          <ICONS.AntDesign name={'right'} size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
   
   
   <View>
       <ScrollView
        nestedScrollEnabled={true}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        ref={ref}
          
       > 
       {data.map((item,index)=>(
        //    <View style={styles.card}>
           <ProductCard data={item} key={index}/>
        //    </View>
       ))}

       </ScrollView>
   </View>
   
    </View>
  );
};

const mapStateToProps= props=>{
  const {bestSeller} = props.home
  return{
    bestSeller
  }
}
export default connect(mapStateToProps, {getBestSeller})(Slider2);

const styles = StyleSheet.create({
    arrowbtn: {
        backgroundColor: COLORS.tomato,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin:5
      },
      h:{
            textAlign:'center',
            ...getFont('OpenSans_b_32'),
            textTransform:'uppercase'
      },
      caption:{
          backgroundColor:COLORS.green,
          color:COLORS.white,
          ...getFont('OpenSans_m_14'),
          padding:3,
          paddingHorizontal:10,
          textTransform:'uppercase'

      },
      card:{
          width:wp(100)
      },
      container:{
      
        backgroundColor:COLORS.white,
         height:hp(57),
         paddingVertical:'5%',
         shadowColor: "#000",
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 1,
         },
         shadowOpacity: 0.18,
         shadowRadius: 1.00,
         
         elevation: 1,
         
         }
});
