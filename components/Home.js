import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, FlatList, TouchableHighlight} from 'react-native';
import Header from './header';
import TodoItem from './todoItem'
import AddTodo from './addTodo'
import DateTimePicker from '@react-native-community/datetimepicker'; 
import {Keyboard} from 'react-native'

export default function Home() {
	const [bg, setbg] = useState('')
	const [counter, setCounter] = useState(0)
	const [todos, setTodos] = useState([
		{text: 'buy coffee', key: '1'},
		{text: 'create an app', key: '2'},
		{text: 'play on the switch', key: '3'},
		{text: 'take a break', key: '4'}
	])

	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('datetime');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
		Keyboard.dismiss()
	};

	const showDatepicker = () => {
		setShow(!show);
	};

	const addText = (todo) => {
		setTodos((prevTodos) => {
			return [{ text: todo, key: Math.random().toString() },
				...prevTodos]
		})
	}

	const pressHandler = (key) => {
		setTodos((prevTodos) => {
			console.log(key)
			return prevTodos.filter(item => item.key != key)
		})
	}

	const backgroundChanger = () => {
		setCounter(counter + 1)
		console.log(counter)
		if (bg == '#fff') {
			// console.log('CHANGE')
			setbg('#10f1f0')
		} else {
			setbg('#fff')
			// console.log('CHANGE BACK')
		}
		console.log(bg)
	}

	const see = () => {
		console.log(mode)
		console.log(date)
		console.log(show)
	}

	return (
		<TouchableHighlight onPress={backgroundChanger}>
			<View style={styles.container} style={{backgroundColor: bg}} >
			{/** header **/}
			<Header />

				<View style={styles.content}>
					<Button onPress={see} title='potat'/>

					<TextInput
						style={styles.input}
						placeholder="datetime"
						onFocus={showDatepicker}
						value={ date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() }
					/>

					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							display="default"
							onChange={onChange}
						/>
					)}

					{/** form **/}
					<AddTodo addText={addText}/>

					{/** list **/}
					<View style={styles.list}>
						<FlatList
							data={todos}
							renderItem={({ item }) => (
								<TodoItem item={item} pressHandler={pressHandler}/>
							)}
						/>
					</View>
				</View>
			</View>
		</TouchableHighlight>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	content: {
		padding: 40,
	},
	list: {
		marginTop: 20,
	},
	header: {

	},
	icon: {
		fontSize: 80
	},
	input: {
		marginBottom: 10,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
});


