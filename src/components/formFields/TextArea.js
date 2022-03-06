import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import {getFont, ICONS, COLORS, hp} from '../../constants'

const TextArea = props => {
  const {
    value,
    placeholder,
    error,
    onTermChange,
    style,
    maxChar,
    textAreaStyle,
    validationStatus,
    validationStatusStyle,
    btnRightText,
    btnRightStyle,
    btnRightTextStyle,
    onPressBtnRight,
    label,
    labelStyle,
    editable,
    iconColor,
    iconStyle,
    icon,
    iconFamily,
	textInputColor

  } = props
  const [field, setField] = useState('')
  const [onFocus, setOnFocus] = useState(false)
  const [border, setBorder] = useState(null)
  const handleTextChange = val => {
    setField(val)
    onTermChange(val)
    setBorder(val.length ? 'green' : 'red')
  }

  useEffect(() => {
    if (value) {
      setField(value)
    }
    if (error && !field) {
      setBorder('red')
    }
  }, [value, error])

  return (
    <TouchableWithoutFeedback onPress={() => setOnFocus(true)}>
      <>
        <View style={styles.row1}>
          {label && (
            <View>
              <Text
                style={[styles.label, labelStyle, !editable && {color: COLORS.disabled}]}>
                {label}
              </Text>
            </View>
          )}
          {validationStatus && (
            <Text style={[styles.validationStatus]}>{validationStatus}</Text>
          )}
          {maxChar && (
            <View>
              <Text style={styles.maxChar}>
                {field.length}/{maxChar}
              </Text>
            </View>
          )}

          {btnRightText && (
            <TouchableHighlight
            underlayColor={COLORS.tomato}
              style={[styles.btnRightStyle, btnRightStyle]}
              onPress={() => onPressBtnRight()}
              underlayColor={'transparent'}>
              <Text style={[styles.btnRightText, btnRightTextStyle]}>
                {btnRightText}
              </Text>
            </TouchableHighlight>
          )}
        </View>

        <View
          style={[
            styles._textInput,
			style,
            !!editable && styles.disabledTextInput,
            !!border &&
			validationStatus && {
				...styles.error,
                borderColor: border,
                borderBottomColor: border,
                // paddingRight:25,
                // paddingTop:5,
                // position:'absolute'
			},
			textAreaStyle,
            // {borderColor:  validationStatus?}
            // onFocus && styles.active_border,
          ]}>
          <View style={styles.flexRow}>
            <TextInput
            onBlur={()=>Keyboard.dismiss()}
              style={style}
              maxLength={maxChar}
              onFocus={() => setOnFocus(true)}
              multiline={true}
              placeholder={placeholder}
              placeholderTextColor={COLORS.gray}
              onChangeText={val => handleTextChange(val)}
              value={field || value}
              editable={editable}
              onPressBtnRight={onPressBtnRight}
              btnRightText={btnRightText}

              // onBlur={() => setOnFocus(false)}
              // onTouchEnd={() => setOnFocus(false)}
            />
            {icon ? (
              <View
                style={[
                  // styles.textInputIcon,
                  iconStyle,

                  {position: 'absolute', right: 10, top: 5},
                ]}>
                {iconFamily ? (
                  iconFamily === 'AntDesign' ? (
                    <ICONS.AntDesign
                      name={icon}
                      color={iconColor ? iconColor : COLORS.black1}
                      size={16}
                    />
                  ) : null
                ) : (
                  <ICONS.MaterialIcons
                    name={icon}
                    color={iconColor ? iconColor : COLORS.black1}
                    size={16}
                  />
                )}
              </View>
            ) : !!border && !!validationStatus ? (
              <ICONS.AntDesign
                name={
                  border === 'green' && field.length
                    ? 'checkcircle'
                    : validationStatus && !field.length && 'closecircle'
                }
                color={border}
                size={16}
                // style={{ position:'absolute', right:0 }}
              />
            ) : null}
            </View>
          </View>
        {/* </View> */}
      </>
    </TouchableWithoutFeedback>
  )
}

export default TextArea

const styles = StyleSheet.create({
  validationStatus: {
    // ...getFont.body4_r.OpenSans,
    ...getFont('OpenSans_r_14'),
    paddingBottom: '2%',
    color: COLORS.gray3,
    lineHeight: 16,
    color: COLORS.yellow,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  error: {
    borderWidth: 3,
    borderColor: 'red',
    borderBottomWidth: 3,
    borderBottomColor: 'red',
  },
  disabledTextInput: {
    backgroundColor: COLORS.lightGray4,
    borderBottomColor: COLORS.lightGray1,
    color: COLORS.disabled,
  },
  row1: {
    flexDirection: 'row',

    // display:'flex',
    justifyContent: 'space-between',
  },
  textInput: {flex: 1.5},
  _textInput: {
    backgroundColor: COLORS.light,
    borderRadius:10,
    // borderColor: 'transparent',
    // borderColor: COLORS.light2,
    // borderBottomWidth: 2,
    marginTop:'4%',
    marginBottom:'6%',
    marginHorizontal:'3%',
    height: hp(20),
    paddingLeft: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // color: COLORS.black1,
    width: '94%',
    ...getFont('Poppins_r_16'),
    // ...getFont.h2_r.Poppins,
  },
  flexRow: {flexDirection: 'row', justifyContent: 'space-between'},
  textInputIcon: {
    flex: 0.1,
    backgroundColor: 'red',
    paddingTop: '4%',
    // paddingLeft: "2%"
  },

  active_border: {
    borderWidth: 2,
    borderColor: COLORS.black1,
    borderBottomColor: COLORS.black1,
    borderRadius: 4,
  },
  danger_border: {
    borderWidth: 2,
    borderColor: COLORS.danger,
    borderBottomColor: COLORS.danger,
    borderRadius: 4,
  },
  label: {
    // ...getFont.body4_r.OpenSans,
    ...getFont('OpenSans_r_14'),
    paddingBottom: '2%',
    color: COLORS.gray3,
    lineHeight: 16,
  },
  placeholder: {
    color: COLORS.lightGray1,
    // ...getFont.h2_r.Poppins,
    ...getFont('Poppins_r_16'),
  },
  btnRightText: {
    ...getFont('Poppins_b_18'),
    // ...getFont.h1_b.Poppins,
    color: COLORS.gray3,
    lineHeight: 16,
    letterSpacing: 0.43,
    textAlign: 'right',
  },

  maxChar: {
    ...getFont('OpenSans_r_14'),
    // ...getFont.body4_r.OpenSans,
    color: COLORS.gray3,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  textInputIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    // alignSelf: 'center',
    // marginLeft: -30,
    // height: 50,
    // alignItems: 'flex-end',
    // justifyContent: 'center'
  },
})
