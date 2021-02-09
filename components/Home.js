import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight} from 'react-native';
import Header from './header';
import TodoItem from './todoItem'
import AddTodo from './addTodo'

export default function Home() {
	const [bg, setbg] = useState('')
	const [counter, setCounter] = useState(0)
	const [todos, setTodos] = useState([
		{text: 'buy coffee', key: '1'},
		{text: 'create an app', key: '2'},
		{text: 'play on the switch', key: '3'},
		{text: 'take a break', key: '4'}
	])

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

	return (
		<TouchableHighlight onPress={backgroundChanger}>
			<View style={styles.container} style={{backgroundColor: bg}} >
			{/** header **/}
			<Header />

			<View style={styles.content}>
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
	}
});


