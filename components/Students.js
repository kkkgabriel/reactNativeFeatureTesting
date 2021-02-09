import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import store from '../redux/configureStore'

const db = SQLite.openDatabase('rnProj.db')
const Stack = createStackNavigator()

export default function Students() {
	return (
		<Stack.Navigator mode='modal' headerMode="none">
			<Stack.Screen
				name="StudentStack"
				component={StudentStack}
			/>
			<Stack.Screen
				name="AddScreen"
				component={AddScreen}
			/>
		</Stack.Navigator>
	)
}

const InnerStack = createStackNavigator()
function StudentStack({ navigation }) {
	return (
		<InnerStack.Navigator>
			<InnerStack.Screen
				name="StudentScreen"
				component={StudentScreen}
				options={
					{
						headerTitle: "StudentScreen",
						headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 30,
					},
					headerStyle: {
						height: 120,
						backgroundColor: "yellow",
						borderBottomColor: "#ccc",
						borderBottomWidth: 1,
					},
				}}
			/>
		</InnerStack.Navigator>
	)
}

function StudentScreen({ navigation }) {
	const [i, seti] = useState(0)
	useEffect(() => {
		console.log('magic here')
		db.transaction(
			// statement
			(tx) => {
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)',
					null,
					(tx, resultSet) => {
						console.log('statement sucess')
						console.log(resultSet)
					},
					(tx, err) => {
						console.log('statement err')
						console.log(err)
					}
				)
			},

			// err
			(err) => {
				console.log('ohno');
				console.log(err)
			},

			// sucess
			() => {
				console.log('ahha')
			}
		)
		console.log('magic here done')
	})

	const makeSth = () => {
		console.log('-----------------------')
		db.transaction(
			// statement
			(tx) => {
				tx.executeSql(
					'INSERT INTO items (text, count) VALUES ("pear", 3)',
					null,
					(tx, resultSet) => {
						console.log('statement sucess')
						console.log(resultSet)
					},
					(tx, err) => {
						console.log('statement err')
						console.log(err)
					}
				)
			},

			// err
			(err) => {
				console.log('ohno');
				console.log(err)
			},

			// sucess
			() => {
				console.log('ahha')
			}
		)
	}

	const showAddScreen = () => {
		navigation.navigate(AddScreen)
		seti( i + 1)
	}
	
	const anotherRandButton = () => {
		console.log('lalalal')
		console.log(store.getState())
		// console.log('this is db')
		// console.log(db)
	}

	return (
		<View>
			<Text>student screen  {i}  </Text>
			<Button onPress={showAddScreen} style={{ margin: 10 }} title='press me'/>
			<Button onPress={anotherRandButton} style={{ margin: 10 }} title='press me too'/>
			<Button onPress={makeSth} style={{ margin: 10 }} title='press me three'/>
			<TouchableOpacity
				onPress={anotherRandButton}
			>
				<Text>potato</Text>
			</TouchableOpacity>
		</View>
	)
}

function AddScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>This is the add screen</Text>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{ padding: 10 }}
			>
				<Text style={{ color: "orange" }}>Dismiss</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffc',
		alignItems: 'center',
		justifyContent: 'center'
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

