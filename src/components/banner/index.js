import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {hp, SIZES, getFont, COLORS, wp, IMAGES} from '../../constants';
import {connect} from 'react-redux'
import { getHomeSlider ,getHomePageCatg} from '../../store/actions';
import {useNavigation} from '@react-navigation/native'
import { filterCategory } from '../../util';

const Banner = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setdata] = useState([])
  const navigation = useNavigation()
  const [mainCtg, setmainCtg] = useState({})


  React.useEffect(() => {
if(!props.homePageCatg || props.homePageCatg && !props.homePageCatg.length){
      props.getHomePageCatg((temp)=>{
        let data =filterCategory(temp)
        setmainCtg(data[0])
      }
       )
    }else{
      setmainCtg(props.homePageCatg[0])
    }
    
   

    if(!props.HomeSlider.length){
      props.getHomeSlider()
    }else{ 
        setdata(props.HomeSlider)
    }

    let interval;
    if(data.length){

     interval = setInterval(() => {
        let count = activeSlide;
        setActiveSlide(count < data.length - 1 ? count + 1 : 0);
      }, 3000);
    
    }
    

    return () => {
      clearInterval(interval);
    };
  }, [props.HomeSlider.length, activeSlide, props.homePageCatg &&props.homePageCatg.length]);
// console.log(data)
  return (
    <View style={styles.container}>
    {data.length>0 &&  <ImageBackground
        source={data[activeSlide].image?{uri:data[activeSlide].image}:IMAGES.bannerImg3}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.mask}>
          <Text style={styles.text1}>{data[activeSlide].h1}</Text>
          <Text style={styles.text2}>{data[activeSlide].caption}</Text>
          {/* <Text style={styles.text3}>{data[activeSlide].text3}</Text> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('mainShop',{catg:mainCtg })}>
            <Text style={styles.btnText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>}
    </View>
  );
};

const mapStateToProps = props=>{  
  const {homePageCatg} = props.home
  // console.log(props.home.HomeSlider)
  return{
    HomeSlider: props.home.HomeSlider,
    homePageCatg,
  }
}

export default  connect(mapStateToProps,{getHomeSlider,getHomePageCatg})(Banner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: hp(40),
    resizeMode:'contain',
    alignItems: 'center',
  },

  text1: {
    ...getFont('Poppins_m_24'),
    color: COLORS.white,
    marginTop:-hp(3),
    textAlign:'center'
   
  },
  text2: {
    ...getFont('Montserrat_b_28'),
    textAlign: 'center',
    color: COLORS.tomato,
    marginTop: hp(1),
    textAlign:'center'
  },
  text3: {
    ...getFont('Poppins_m_18'),
    textAlign: 'center',
    color: COLORS.white,
    marginTop: hp(1),
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: wp(5),
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
      backgroundColor:COLORS.green,
     height:50,
     borderRadius:35,
     marginTop:'4%',
     alignItems:'center',
     justifyContent:'center',
      width:wp(40)
  },
  btnText:{
    ...getFont('Poppins_m_16'),
    color:COLORS.white
  }
});
