import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,

  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS,  wp, hp, getFont} from '../../constants';
import CategoryCard from '../card/categoryCard';
import { useNavigation } from '@react-navigation/native'
import {connect} from 'react-redux'
import { getHomePageCatg } from '../../store/actions';

const Slider1 = props => {
  const scrollRef = useRef(null);
  const navigation= useNavigation();
  const [data, setdata] = useState([])

useEffect(() => {
  if(!props.homePageCatg.length){
    props.getHomePageCatg()
  }else{
    // console.log("PROPS.data", props.homePageCatg)
    setdata(props.homePageCatg)

  }
}, [props.homePageCatg.length])

  const renderData = data => {
    let maxSlideCount = Math.abs(Math.ceil(data.length / 6));
   
    let component = [];
    let mainComponent = [];
    let startfrom = 0;


    for (let index = 0; index < maxSlideCount; index++) { //manage slide
     
    
      for (let index2 = startfrom; index2 < startfrom + 6; index2++) { // manage card in each slide
    
     
        if (data[index2] && data[index2].name) {
          component.push(
           <CategoryCard key={index} data={data[index2]} onPressCard={()=>navigation.navigate('mainShop',{catg:data[index2]})}/>
          );
          if (component.length === 6) {
            break;
          }
         
        }
      }

      mainComponent.push(
        <View
          style={[{
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            
          }]}>
          {component}
        </View>,
      );
      startfrom = startfrom + 6;
    
      component = [];
    }

    return mainComponent;
  };

  return (
    <View style={styles.container}>
     
      <View style={{paddingLeft:'2%'}}>
        <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.h1}>Categories</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('allCategories')}>
              <Text style={styles.linkText}>View All</Text>
            </TouchableOpacity>
        </View>
        <ScrollView
          // pagingEnabled
          nestedScrollEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}>
          {renderData(data)}
        </ScrollView>
      </View>
     
    </View>
  );
};
const mapStateToProps=props=>{
  // console.log("zzzzzzzzzzzzzzzzzzzzzzz",props.home)
  const {homePageCatg} = props.home
  return{
    homePageCatg
  }
}

export default connect(mapStateToProps, {getHomePageCatg})(Slider1);

const styles = StyleSheet.create({
  container: {

    width: wp(100),
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginTop: -hp(10),
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  
 
  arrowbtn: {
    backgroundColor: COLORS.light2,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  
  h1:{
    ...getFont('Roboto_b_20'),
    fontWeight:'bold',

    paddingTop:'6%',
    paddingLeft:'4%',
    paddingBottom:0,
    letterSpacing:0.4
  },
  linkText:{
    ...getFont('OpenSans_m_16'),
    color:COLORS.green,
    paddingTop:'5%',
    paddingRight:'3%'
  }
});
