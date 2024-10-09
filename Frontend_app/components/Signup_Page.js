import React, { useState } from 'react';
import { VStack, Button, Input, Center, Heading, Text, Image, HStack } from 'native-base';
import axios from 'axios';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.184.77:3000/api/users', {
        name: username,
        email: email,
        password: password,
        balance: 0,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        await AsyncStorage.setItem('@userid', response.data.userId)
        console.log('Signup Successfull')
        const userId = await AsyncStorage.getItem('@userid')
        console.log(userId)
        navigation.navigate('Transactions');
      } else {
        setErrorMessage('Signup failed!');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error signing up!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      <Center flex={1} px={4}>
        
        <Image
          source={{ uri: 'https://play-lh.googleusercontent.com/nn3jXKaItb-nryaw47o1-6diQ1OckdBnI_TO8MJB4GpMRB6pkmi1SjsVDihqpWqeC9xa' }}
          alt="App Logo"
          size="xl"
          mb={6}
        />
        
        <Heading color="primary.800" mb={12}>
          Expense Tracker
        </Heading>

        <VStack space={4} w="100%" maxWidth="400px" borderWidth={1} borderColor="#ccc" borderRadius="lg" p={6} bg="white" shadow={2}>
          <Heading color="#4a90e2" textAlign="center">Sign Up</Heading>
          {errorMessage ? (
            <Text color="red.500" textAlign="center">{errorMessage}</Text>
          ) : null}
          <Input
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            variant="outline"
            bg="gray.50"
            borderColor="#4a90e2"
            borderRadius="md"
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            variant="outline"
            bg="gray.50"
            borderColor="#4a90e2"
            borderRadius="md"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChangeText={text => setPassword(text)}
            variant="outline"
            bg="gray.50"
            borderColor="#4a90e2"
            borderRadius="md"
          />
          <Button mt={4} onPress={handleSignup} bg="#4a90e2" borderRadius="md">
            Sign Up
          </Button>
          <Text textAlign="center" mt={4}>
            Already have an account? 
            <Text color="#4a90e2" onPress={() => navigation.navigate('Login')}> Log In</Text>
          </Text>
        </VStack>

        <HStack mt={6} justifyContent="center">
          <Button 
            onPress={() => console.log('Google Signup')} 
            colorScheme="red" 
            variant="outline"
            width="100%"
          >
            Sign Up with Google
          </Button>
        </HStack>

      </Center>
    </SafeAreaView>
  );
};

export default SignupScreen;
