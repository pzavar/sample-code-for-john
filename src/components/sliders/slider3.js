import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View , TouchableOpacity} from 'react-native';
import { COLORS, SIZES } from '../../../constants';


const Pagination = ({ data, handlePagination, activeSlide, setActiveSlide }) => {

	const styles = paginationStyle;
	return (

		<View style={styles.paginationContainer}>
			{data.map((item, index) => (
				<TouchableOpacity
					key={index}
					style={[styles.pageIndicator, index === activeSlide && { backgroundColor: COLORS.yellow, borderColor: COLORS.yellow }]}
					onPress={() => {
						setActiveSlide(index)
						handlePagination(index);
					}}>
					<View />
				</TouchableOpacity>
			))}
		</View>
	);
}


const Carousel = ({ data }) => {
	const scrollRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0)
	const handlePagination = (itemIndex) => {
		scrollRef.current.scrollTo({ x: itemIndex * (SIZES.width * 0.6) })
	};
	return (
		<View>
			<View>
				<ScrollView
					nestedScrollEnabled={true}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					ref={scrollRef}
				>
					{data.map((item, index) => (
						<View key={index} style={index === data.length - 1 && { marginRight: 20 }}>
							<Card1 key={index} data={item} />
						</View>
					))}

				</ScrollView>
				<Pagination
					activeSlide={activeSlide}
					setActiveSlide={setActiveSlide}
					data={data} handlePagination={handlePagination} />

			</View>
		</View>
	)
}

export default Carousel



const paginationStyle = StyleSheet.create({
	paginationContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-evenly',
		maxWidth: '50%',
		marginVertical: '5%'
	},
	pageIndicator: {
		width: 10,
		height: 10,
		borderWidth: 1,
		borderColor: COLORS.light,
		marginRight: 10
	}
});

