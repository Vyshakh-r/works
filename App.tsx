import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, Modal } from 'react-native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 20,
    },
    imageContainer: {
      marginTop: 50,
      marginBottom: 20,
      alignItems: 'center',
      backgroundColor:'#C70E8F',
      borderRadius: 90,
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      textAlign: 'center',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 50,
      marginVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    button: {
      width: '100%',
      height: 50,
      marginVertical: 10,
      backgroundColor: '#007bff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://traveller.talrop.works/api/v1/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration successful');

        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else if (response.status === 409) {
        setModalMessage('Email address already registered.');
        setModalVisible(true);
      } else {

        setModalMessage(data.message || 'Something went wrong');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Registration failed', 'Please try again later');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image
          source={require('./src/assets/images/logo.png')}
          style={Styles.image}
        />
      </View>
      <Text style={Styles.title}>Sign Up</Text>
      <Text style={Styles.description}>
        Please fill in the following fields to create your account.
      </Text>
      <TextInput
        style={Styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={Styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={Styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={Styles.button} onPress={handleSignUp}>
        <Text style={Styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={Styles.modalContainer}>
          <View style={Styles.modalContent}>
            <Text style={Styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={Styles.modalButton} onPress={closeModal}>
              <Text style={Styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SignUpScreen;

