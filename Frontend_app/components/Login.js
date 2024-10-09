import React, { useState } from 'react';
import { VStack, Button, Input, Center, Heading, Text, Image, HStack } from 'native-base';
import axios from 'axios';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const HandleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.184.77:3000/api/users/login', {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                await AsyncStorage.setItem("@userid" , response.data._id)
                const id = await AsyncStorage.getItem('@userid')
                console.log("Login : " , id)
                navigation.navigate('Transactions');
            } else {
                setErrorMessage('Login failed!');
            }
        } catch (err) {
            console.log(err)
            setErrorMessage(err.response?.data?.message || 'Invalid Email or Password');
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
                    <Heading color="#4a90e2" textAlign="center">Login</Heading>
                    
                    {errorMessage ? (
                        <Text color="red.500" textAlign="center">{errorMessage}</Text>
                    ) : null}
                    
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
                    
                    <Button mt={4} onPress={HandleSubmit} bg="#4a90e2" borderRadius="md">
                        Login
                    </Button>
                    
                    <Text textAlign="center" mt={4}>
                        Don't have an account? 
                        <Text color="#4a90e2" onPress={() => navigation.navigate('Signup')}> Sign Up</Text>
                    </Text>
                </VStack>

                <HStack mt={6} justifyContent="center">
                    <Button 
                        onPress={() => console.log('Google')} 
                        colorScheme="red" 
                        variant="outline"
                        width="100%"
                    >
                        Login with Google
                    </Button>
                </HStack>

            </Center>
        </SafeAreaView>
    );
}

export default LoginScreen;
