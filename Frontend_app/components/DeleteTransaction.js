import React, { useState, useEffect } from 'react';
import { Center, Heading, Button, VStack, Box, Text } from 'native-base';
import Header from './Header1.js';
import Footer from './Footer1.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteTransaction = ({ navigation, route }) => {
    const { id } = route.params;
    // const [transactionId, setTransactionId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     const fetchTransactionId = async () => {
    //         try {
    //             const tid = await AsyncStorage.getItem('@transactionid');
    //             console.log("Fetched tid:", tid);
    //             if (tid !== null) {
    //                 setTransactionId(tid);
    //             } else {
    //                 setErrorMessage('Transaction ID not found');
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     fetchTransactionId();
    // }, []);

    const handleDelete = async () => {
        try {
            console.log(id)
            const response = await axios.delete(`http://192.168.184.77:3000/api/transaction/${id}`);
            if (response.status === 200) {
                console.log("Transaction deleted");
                navigation.navigate('Transactions');
            } else {
                console.log("Error deleting transaction");
            }
        } catch (err) {
            if (err.response) {
                console.log("Response error:", err.response.data);
                console.log("Status:", err.response.status);
                console.log("Headers:", err.response.headers);
            } else if (err.request) {
                console.log("Request error:", err.request);
            } else {
                console.log("Error:", err.message);
            }
        }
    };

    const handleNegation = () => {
        navigation.navigate('Transactions');
    };

    return (
        <Box flex={1} safeArea bg="white">
            <Header navigation={navigation} />
            <Center flex={1} px={4}>
                <VStack space={5} w="100%" maxW="400px" bg="white" borderRadius="lg" shadow={2} p={6} alignItems="center">
                    <Heading color="red.500" mb={4}>Delete Transaction</Heading>
                    {errorMessage ? (
                        <Text color="red.500" textAlign="center">{errorMessage}</Text>
                    ) : (
                        <>
                            <Text fontSize="md" textAlign="center" color="gray.600" mb={6}>
                                Are you sure you want to delete this transaction?
                            </Text>
                            <VStack space={3} w="100%">
                                <Button bg="red.500" _hover={{ bg: "red.600" }} onPress={handleDelete}>
                                    Yes, Delete
                                </Button>
                                <Button bg="gray.400" _hover={{ bg: "gray.500" }} onPress={handleNegation}>
                                    No, Cancel
                                </Button>
                            </VStack>
                        </>
                    )}
                </VStack>
            </Center>
            <Footer navigation={navigation} />
        </Box>
    );
};

export default DeleteTransaction;
