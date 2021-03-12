import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Button,
  Pressable,
  ScrollView
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
	// Constants 
	const CONTACTS_KEY = 'contacts';

	// store text inputs
	const [key, setKey] = useState();
	const [name, setName] = useState();
	const [imageUri, setImageUri] = useState(null);

	// Modal states
	const [modalVisible, setModalVisible] = useState(false);

	// data
	const [contacts, setContacts] = useState([]);
	const emergencyNumbers = [
	{
		name: "Police",
		key: "97830000",
		imageURL:
		"https://cdn1.vectorstock.com/i/1000x1000/94/60/policeman-in-uniform-vector-4409460.jpg",
	},
	{
		name: "SOS",
		key: "18002214444",
		imageURL:
		"https://uploads-ssl.webflow.com/5a4c78412b69220001d82c7d/5a4c78412b69220001d82d29_3.svg",
	},
	{
		name: "Ambulance",
		key: "995",
		imageURL:
		"https://p1.hiclipart.com/preview/563/664/55/ambulance-cartoon-emergency-telephone-number-emergency-service-emergency-call-box-first-aid-health-certified-first-responder-vehicle-png-clipart.jpg",
	}];

	// function to render image from array 
	const renderImage = (array) =>
		array.map(({ name, key, imageURL }) => {
			return (
				<TouchableOpacity
					key={key}
					onPress={() => Linking.openURL(`tel: ${key}`)}
				>
					<Text style={{ fontSize: 20, color: "blue" }}>{name}</Text>
					<Image
						style={{ width: 100, height: 100, marginBottom: 15 }}
						source={{ uri: `${imageURL}` }}
					/>
				</TouchableOpacity>
			);
	});

	// function to add contact into local storage
	const addContact = () => {
		const contact =     {
			name: name,
			key: key,
			imageURL: imageUri, 
		}
		AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify([...contacts, contact]))
		setContacts([...contacts, contact])
		clear()
	}	

	// function to load contacts from local storage
	async function loadContacts() {
		try {
			const contactsString = await AsyncStorage.getItem(CONTACTS_KEY)
			if (contactsString) {
				console.log('this is contacts string')
				console.log(contactsString)
				setContacts(JSON.parse(contactsString))
			}
		} catch (err) {
			// pass
		}
	}
  
	// function to clear all inputs
	const clear = () => {
		setName('')
		setKey('')
		setImageUri('')
	}

	// function to open image selector
	const openImageSelector = async () => {
		let image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!image.cancelled) {
			setImageUri(image.uri);
		}
	}

	// function to open camera
	const openCamera = async () => {
		let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));

		if (!image.cancelled) {
			// set the 'image' state to contain the image uri
			setImageUri(image.uri);
		}
	}

	useEffect(() => {
		console.log('using effect')
		loadContacts()
	}, [])

	return (
		<View style={styles.container}>
			<ScrollView >
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>

						<TouchableOpacity
							style={[styles.buttonClose]}
							onPress={() => { setModalVisible(!modalVisible)}}
						>
							<Text style={styles.textStyle}>x</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.cusButtons]}
							onPress={() => { openImageSelector(), setModalVisible(!modalVisible)}}
						>
							<Text style={styles.textStyle}>Select image from gallery</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.cusButtons]}
							onPress={() => { openCamera(), setModalVisible(!modalVisible)}}
						>
							<Text style={styles.textStyle}>Open camera</Text>
						</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<Text
					style={{ fontSize: 24, fontWeight: "bold", padding: 30, color: "red" }}
				>
					SENIOR FRIEND APP
				</Text>
				<StatusBar style="auto" />

				{renderImage(contacts)}

				<View style={styles.emergencyNumbers}>
					{renderImage(emergencyNumbers)}
				</View>

				<TextInput
					style={{ height: 20, borderColor: "red", borderWith: 2 }}
					placeholder="Add name" // Initial display on text input box
					style={{ color: "blue", fontWeight: "bold" }}
					onChangeText={(input) => setName(input)} //This will set the text input
				></TextInput>

				<TextInput
					style={{ height: 20, borderColor: "red", borderWith: 2 }}
					placeholder="Add number" // Initial display on text input box
					style={{ fontWeight: "bold", color: "blue" }}
					onChangeText={(input) => setKey(input)} //This will set the text input
				></TextInput>

				<TouchableOpacity style={styles.submitButtonAdd} onPress={addContact}>
					<Text style={styles.buttonText}>Add!</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.submitButtonUpload} onPress={() => setModalVisible(true)}>
					<Text style={styles.buttonText}>Upload image</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	submitButtonAdd: {
		backgroundColor: "#00bfff",
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
	},
	submitButtonUpload: {
		backgroundColor: "#00bfff",
		padding: 10,
	},
	buttonText: {
		color: "red",
		fontWeight: "bold",
	},
	emergencyNumbers: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		marginLeft: 20,
		marginRight: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginBottom: 5,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	cusButtons: {
		backgroundColor: "#2196F3",
	},
	buttonClose: {
		position: 'absolute',
		right: 0,
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});

