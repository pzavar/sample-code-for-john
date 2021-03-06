export const COLORS = {
    orange: '#ed6663',
    white:'#ffffff',
    lightGreen: '#80b534',
    green:'#0e5f6b',
    greenShade08:'rgba(14, 95, 107,0.8)',
    greenShade04:'rgba(14, 95, 107,0.4)',
    greenLightShade01:'rgba(14, 95, 107,0.1)',
    darkBlue: '#131e2c',
    light: '#f5f5f5',
    dark: '#292929',
    light2: '#d8dce0',
    gray: '#7c7c7c',
    gray2: '#a7a7a7',
    gray3L:'#777777',
    gray4:'#adacac',
    purple: '#685b88',
    skyBlue: '#6ec3f0',
    seaGreen: '#19bc9b',
    red: '#e21836',
    black1: '#1c1e23',
    black2: '#252932',
    lightGray: '#b7bcc8',
    facebook: '#3d5b9a',
    twitter: '#339bec',
    googlePlus: '#e33828',
    wifi: '#fd9f13',
    pinterest: '#ca2127',
    linkedIn: '#017ba5',
    youTube: '#f03433',
    black:'#000',
    tomato:'#f4815a',
    tomatoShade01:'rgba(244, 129, 90,0.1)',
    tomatoShade04:'rgba(244, 129, 90,0.4)',
    tomatoShade08:'rgba(244, 129, 90,0.8)',
    
    red2:'#dd4b59',
    violet:'#685c88',
    bgLight:'#f7f7f6',
    
    danger: '#F32013',

    warning: '#ffc107',
    success: '#4bb543',
    info: '#6f6f6f',
    disabled: '#c2c2c2'


}
export const SIZES={
    text8:8,
    text9:9,
    text10:10,
    text11:11,
    text12:12,
    text14:14,
    text16:16,
    text18:18,
    text20:20,
    text:22,
    text24:24,
    text26:26,
    text28:28,
    text30:30,
    text32:32
}


const fontFamily={
    "Montserrat" :{
        m:'Montserrat-Medium',
        r:'Montserrat-Regular',
        b:'Montserrat-Bold'
    } ,
    "OpenSans" :{
        m:'OpenSans-SemiBold',
        r:'OpenSans-Regular',
        b:'OpenSans-Bold'
    },
    "Poppins" :{
        m:'Poppins-Medium',
        r:'Poppins-Regular',
        b:'Poppins-Bold'
    },
    "Oswald" :{
        m:'Osawald-Light',//not working
        r:'Osawald-Medium',//not working
        b:'Osawald-Bold',//not working
        sm:'Oswald-SemiBold'//not working
    },
    "Roboto" :{
        m:'RobotoCondensed-Medium', //not working
        r:'RobotoCondensed-Regular',
        b:'RobotoCondensed-Bold', 
        sm:'RobotoCondensed-SemiBold' //not working
    },
    
    "Rubik":{
        r:"Rubic-VariableFont_wght",
        m:"Rubic-VariableFont_wght",
        b:"Rubic-VariableFont_wght",
    }
}



export const getFont=(font)=>{
    let string=font.split('_')
    // console.log(fontFamily[string[0]][string[1]])
    let obj ={}
        obj.fontFamily= fontFamily[string[0]][string[1]]&& fontFamily[string[0]][string[1]],
        obj.fontSize= Number(string[2])
    
    return obj
}
