import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';


function Settings({navigation}) {

	const goToAbout = () =>{
		navigation.navigate('About', {name: 'samsung v5', year: '2010'})
	}

	const rightButton = () => {
		console.log('right btn 1')
	}

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				<Button onPress={rightButton} title='potato'/>
			}
		})
		console.log('mount')
	})

	return (
		<View style={styles.content}>
			<TouchableHighlight>
				<Text onPress={goToAbout}>About</Text>
			</TouchableHighlight>
			<FontAwesome style={styles.icon} name="trash-o" />
		</View>
	)
}

function About({navigation, route}) {
	const {name, year} = route.params
	const [count, setCount] = useState(0)
	const [anotherCount, setAnotherCount] = useState(0)
	const incCount = () => {
		console.log('=================================')
		setCount(count + 1)
		setAnotherCount(anotherCount + 1)
	}

	const details = () => {
		console.log(name)
		console.log(year)
	}

	const rightButton = () => {
		console.log('right btn 2')
		navigation.pop()
	}

	// componentDidUpdate according to the states in list
	useEffect(() => {
		console.log('update')
	}, [count, anotherCount])

	// componentDidMount, but always after update (because mount is after update in lifecycle lol)
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button onPress={rightButton} title='potato'/>
			// cannot be this, only 1 JSX element expected
			// headerRight: () => {<Button onPress={rightButton} title='potato'/>}

		})
		console.log('mount')
	})

	// componentDidMount, this only run once, works better.
	useEffect(() => {
		console.log('mount2')
	}, [])

	// componentDidUnmount
	useEffect(() => {
		return () => {
			console.log('unmount')
		};
	})

	return (
		<View>
			<Text>About page</Text>
			<Text>{count}</Text>
			<Text>{anotherCount}</Text>
			<Text>{year}</Text>
			<Button onPress={()=>{incCount()}} title='++'/>
			<Button onPress={()=>{details()}} title='See details'/>
		</View>
	)
}

const Stack = createStackNavigator()

export default function SettingStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="About" component={About} />
		</Stack.Navigator>
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

