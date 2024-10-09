import React, { useEffect, useState } from 'react';
import { VStack, Button, Input, Center, Heading, HStack, Image, Box, Text } from 'native-base';
import axios from 'axios';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header1';
import Footer from './Footer1';

const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = await AsyncStorage.getItem('@userid');
                setUserId(uid)
                const res = await axios.get(`http://192.168.184.77:3000/api/users/uid/${uid}`);

                if (res.status === 200) {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPassword(res.data.password);
                } else {
                    console.log("Error fetching user");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        try {
            console.log(userId)
            const res = await axios.put(`http://192.168.184.77:3000/api/users/${userId}`, {
                name: name,
                email: email,
                password: password,
            });

            if (res.status === 200) {
                console.log("User updated successfully");
                navigation.navigate('UpdateUser')
            }
            else {
                console.log("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            console.log(userId)
            const res = await axios.delete(`http://192.168.184.77:3000/api/users/${userId}`);

            if (res.status === 200) {
                console.log("User deleted successfully");
                navigation.navigate('DeleteUser')
            }
            else {
                console.log("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        navigation.navigate('Startup')
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAFC' }}>
            <Header navigation={navigation} />
            <HStack flex={1} p={4} space={4}>
                <Center flex={1} mb={4}>
                    <Image
                        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }}
                        alt="Profile Picture"
                        size="150px"
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="gray.300"
                        shadow={2}
                    />
                </Center>
                <VStack flex={2} p={4} bg="white" borderRadius="lg" shadow={2} space={4}>
                    <Heading size="lg" mb={4} color="gray.700">Profile</Heading>

                    <Box>
                        <Text fontWeight="bold" mb={1}>Name</Text>
                        <Input
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            bg="gray.100"
                        />
                    </Box>

                    <Box>
                        <Text fontWeight="bold" mb={1}>Email</Text>
                        <Input
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            bg="gray.100"
                        />
                    </Box>

                    <Box>
                        <Text fontWeight="bold" mb={1}>Password</Text>
                        <Input
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            bg="gray.100"
                        />
                    </Box>

                    <HStack space={4} justifyContent="center" mt={4}>
                        <VStack space={4} alignItems="center">
                            <Button
                                width="80%"
                                onPress={handleUpdate}
                                bg="blue.500"
                                _hover={{ bg: "blue.600" }}
                            >
                                Update
                            </Button>
                            <Button
                                width="80%"
                                onPress={handleDelete}
                                colorScheme="red"
                            >
                                Delete
                            </Button>
                            <Button
                                width="80%"
                                onPress={handleLogout}
                                colorScheme="yellow"
                            >
                                Logout
                            </Button>
                        </VStack>
                    </HStack>

                </VStack>
            </HStack>
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
};

export default ProfileScreen;
