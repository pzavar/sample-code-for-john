import ICONS from "./icons";
import { IMAGES } from "./images";
import  { COLORS, SIZES, getFont,} from "./theme";
import {Dimensions} from 'react-native'

const {width, height}= Dimensions.get('screen');

const screenWidth=width
const screenHeight= height

const wp = widthPerc => {
	return  width* widthPerc /100;
}

const hp = heightPerc => {
	return height * heightPerc/100;
}
export {
	IMAGES,
	ICONS,
	COLORS,
	SIZES,
screenHeight,
screenWidth,
	wp,
	hp,
	getFont
};
