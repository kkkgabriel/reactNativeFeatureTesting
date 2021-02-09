import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function AddTodo({ addText }) {
	const [text, setText] = useState('');

	const changeHandler = (val) => {
		setText(val); 
	}

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder="new todo..."
				onChangeText={changeHandler}
			/>
			<Button
				onPress={() => {
					addText(text)
				}}
				title='Add'
				color='coral'
			/>

		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		marginBottom: 10,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
})