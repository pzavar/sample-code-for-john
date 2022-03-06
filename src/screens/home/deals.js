import React, {useState, useEffect} from 'react'
import { ImageBackground,FlatList, StyleSheet, Text, View } from 'react-native'
import { COLORS ,getFont, wp} from '../../constants'
import CountDown from 'react-native-countdown-component';
import ProductCard from '../../components/card/productCard';
import {connect} from 'react-redux'
import { getFeaturedProducts } from '../../store/actions';

const Deals = (props) => {
    const [data, setdata] = useState([])
        useEffect(() => {
            if(props.FeaturedProducts.length){
                setdata(props.FeaturedProducts)
                // console.log("props.FeaturedProducts----------------------", props.FeaturedProducts)
            }else{
                props.getFeaturedProducts()

            }        
        }, [props.FeaturedProducts.length])
    return (
        <View>
            <View style={{  borderBottomWidth:6, borderBottomColor:COLORS.green}}>
    <ImageBackground
            style={{width:'100%', alignItems:'center', justifyContent:'center', height:300,
        }}
            source={{uri:'https://f59acccaf0.nxcli.net/wp-content/uploads/2019/01/slider-07.jpg'}}>
                <Text style={styles.title}>Hurry Up!</Text>
                <Text style={styles.subTitle}>SAVE MORE</Text>
                <Text style={styles.caption}>On special discounted rates</Text>
            </ImageBackground>
            </View>
            {/* <View> */}
            {/* <View style={{marginBottom:45}}>

            
                <CountDown
                    size={30}
                    until={259200}
                    onFinish={() => alert('Finished')}
                    digitStyle={{borderRadius:25, height:wp(25), width:wp(22), marginTop:-60, backgroundColor: COLORS.green,}}
                    digitTxtStyle={{color: COLORS.white, marginTop:-15}}
                    timeLabelStyle={{marginTop:-35, textTransform:'uppercase', ...getFont('OpenSans_m_14')}}
                    timeToShow={['D','H', 'M', 'S']}
                    // timeLabels={{m: null, s: null}}
                />
                </View> */}
                
            {/* </View> */}
            <View style={styles.listSection}>
            <FlatList
                numColumns={2}
                    data={data}
                    renderItem={({ item, index, separators })=><ProductCard from ="deals" data={item}/>}
                    keyExtractor={(item) => item.title+ new Date()}
                    // extraData={selectedId}
                />
            </View>
           
        </View>
       
    )
}
const mapStateToProps= props => {
    const { FeaturedProducts} = props.home
    // console.log("featured producrs==========================", FeaturedProducts[0])
    return{
        FeaturedProducts
    }
}
export default connect(mapStateToProps,{getFeaturedProducts})(Deals)

const styles = StyleSheet.create({

    title:{
        color:COLORS.white,
        marginTop:'5%',
        ...getFont('Poppins_m_34'),
        // letterSpacing:-1.5,
        width:'80%',
        marginBottom:-10,
        textTransform:'uppercase',
        textAlign:'center'
    },
    subTitle:{
        color:COLORS.white,
        ...getFont('Poppins_b_34'),
        width:'80%',
        marginBottom:'4%',
        textTransform:'uppercase',
        textAlign:'center'
    },
    caption:{
        color:COLORS.white,
        ...getFont('Montserrat_r_20'),
        // width:'80%',
        marginBottom:'7%',
        // textTransform:'uppercase',
        textAlign:'center'
    },
    listSection:{
        backgroundColor:COLORS.white, 
        paddingBottom:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4, marginBottom:40}
})
