import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View, TouchableOpacity, } from 'react-native';

import { COLORS, FONTS, SIZES, ICONS } from '../../constants';


const CheckBox = (props) => {
	const { darkMode, value, itemList, onTermChange, error, handleSelectedValues, style, label, editable = true, iconStyle, icon, iconColor, validationStatus, validationStatusStyle, } = props;

	const [field, setField] = useState([]);
	const [validation, setValidation] = useState(null)
	const [selectionList, setSelectionList] = useState([]);

	useEffect(() => {
		let updatedValues = itemList.slice(0);

		/**
		 * if values are already selected and comming from container
		 * then compare it with the display array type and if the 
		 * selected value matches with the type of display array then update 
		 * it's status to true else set it's to false
		 */
		if (value.length) {
			for (let indexOfList = 0; indexOfList < updatedValues.length; indexOfList++) {
				for (let indexOfValueList = 0; indexOfValueList < value.length; indexOfValueList++) {
					if (updatedValues[indexOfList].type.toLowerCase() === value[indexOfValueList].toLowerCase()) {
						updatedValues[indexOfList].selected = true
					}
				}
			}
			setSelectionList(updatedValues)
			setField(value)
		}
		/**
		 * if the value array is empty then it means
		 *  no value selected then pass the default 
		 * display array i.e itemlist into the selectionList 
		 */
		else {
			setSelectionList(itemList)
			setField(value)
		}
		if(error && !field.length && !value.length ){
			setValidation('error')
		}
	
		return () => {
            // Anything in here is fired on component unmount.
           setField([]);
		
		}

	}, [value.length, field.length, error])




	
    
	const handleItemChange = (item) => {
		//update the selected value array
		let arr = selectionList.slice(0);
		let temp = field.slice(0);
		for (let index = 0; index < arr.length; index++) {
			if (arr[index].type === item) {
				arr[index].selected = !arr[index].selected
				if (arr[index].selected === true) {
					temp.push(arr[index].type)
				}
				if (arr[index].selected === false) {
					temp = temp.filter(element => element !== item)

				}
			}

		}
		 setValidation(temp.length?'success':'error')
		setField(temp)
		setSelectionList(arr)
		handleSelectedValues(temp)
		onTermChange(arr)
	}

	
	return (
		<View>
			<View style={[styles.row1]}>
				{label && <View>
					<Text style={[styles.label, !editable && { color: COLORS.disabled }]}>{label}
					</Text>
				</View>}
			<View>
				{validationStatus && <Text style={[
					styles.validationStatus
					// styles.label,
					//  darkMode && DARK_THEME.lightGray7
					// ,  validationStatusStyle,{color:COLORS.yellow, },
					//  !editable && { color: COLORS.disabled 
					//  }
					 ]}>{" "}{validationStatus}</Text>}
				
				{
				icon ?
					<View style={[styles.validationIcon, iconStyle]}>
						<ICONS.MaterialIcons name={icon} color={iconColor ? iconColor : COLORS.black1} size={SIZES.calender} />
					</View>:
					validation=='success'||validation==='error'?	
					<View style={[styles.validationIcon, iconStyle]}>
					<ICONS.AntDesign 
						name={validation==='success'?'checkcircle':'closecircle'}
						color={validation==='success'?'green':'red'}
						size={SIZES.calender} />
				</View>:null
				}
				</View>
			</View>
			<View style={style}>
				{itemList.map((item, index) =>
					<View key={index}>
						<View style={[styles.item,
						{
							marginBottom:
								// index !== value.length - 1 ?
								'2%'
							//  : 0 
						}
						]}>
							<TouchableOpacity
								disabled={!editable}
								onPress={() => editable ?
									
									 handleItemChange(item.type) : {}} >
								<View style={[styles.itemIcon,
								{ backgroundColor: item.selected ? COLORS.yellow : 'transparent', },
								!editable && styles.disabledCheckBox
								]}>
									{item.selected && <ICONS.AntDesign
										name={'check'} color={COLORS.white} size={14} />}
								</View>
							</TouchableOpacity>
							<Text style={[styles.itemText, !editable && { color: COLORS.lightGray1 }]}>{item.type}{"  "}
								<Text style={styles.subText}>{item.subText}</Text>
							</Text>
						</View>
					</View>
				)}
			</View>
		</View>

	)
}

export default CheckBox

const styles = StyleSheet.create({

	validationIcon:{
		alignSelf:'flex-end',
		justifyContent:'flex-end',
		marginRight:4
	},
	validationStatus:{
		...FONTS.body4_r.OpenSans,
		paddingBottom: '2%',
		color: COLORS.gray3,
		lineHeight: 16,
		color:COLORS.yellow,
		fontWeight:'bold',
		textTransform: 'capitalize'
	},

	disabledCheckBox: {
		backgroundColor: COLORS.disabled,
		borderColor: COLORS.gray
	},
	row1: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	placeholder: {
		color: COLORS.lightGray1,
		...FONTS.h2_r.Poppins,
	},
	field: {
		color: COLORS.black1,
		...FONTS.h2_r.Poppins,
	},
	label: {
		...FONTS.body4_r.OpenSans,
		paddingBottom: '2%',
		color: COLORS.gray3,
		lineHeight: 16,
		textTransform: 'capitalize'
	},
	itemText: {
		marginLeft: "4%",
		...FONTS.h2_m.Poppins,
		color: COLORS.black1,
		lineHeight: 18,
		textTransform: 'capitalize'
	},
	itemIcon: {
		width: SIZES.width * 0.05,
		height: SIZES.width * 0.05,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		borderWidth: 2,
		borderColor: COLORS.yellow
	},
	item: {
		flexDirection: 'row',
		alignItems: "center",
	},
	subText: {
		...FONTS.xsmall_r.OpenSans,
		lineHeight: 18,
		letterSpacing: 0.16,
		color: COLORS.black3
	}

})
