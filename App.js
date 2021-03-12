// react imports
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage'

// screens imports
import Settings from './components/Settings'
import Home from './components/Home'
import Images from './components/Images'
import Students from './components/Students'

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

// redux imports
import { useSelector, useDispatch, Provider } from "react-redux";
import store from './redux/configureStore'
import { signInAction } from "./redux/ducks/blogAuth";

const Tab = createBottomTabNavigator();

export default function AppWrapper() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

function App() {

  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.auth.signedIn);

  return (
	<NavigationContainer>
		<Tab.Navigator
			screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				if (route.name === 'Home') {
					iconName = focused
					? 'ios-information-circle'
					: 'ios-information-circle-outline';
				} else if (route.name === 'Settings') {
					iconName = focused ? 'ios-list-box' : 'ios-list';
				} else if ( route.name === 'Students' ) {
					iconName = focused ? 'people-circle' : 'people-circle-outline'
				} else if ( route.name === 'Images') {
					iconName = focused ? 'image': 'image-outline'
				}

				// You can return any component that you like here!
				return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: 'tomato',
				inactiveTintColor: 'gray',
			}}
        >
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Images" component={Images} />
			<Tab.Screen name="Settings" component={Settings} />
			<Tab.Screen name="Students" component={Students} />
	  	</Tab.Navigator>
	</NavigationContainer>
  )
}



