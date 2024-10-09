import React, { useState , useEffect } from 'react';
import { Center, Heading, Button, HStack, VStack, Box, Text, Input, Select, CheckIcon } from 'native-base';
import Header from './Header1.js';
import Footer from './Footer1.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTransaction = ({ navigation }) => {
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState("")

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('@userid');
                if (userId !== null) {
                    setUser(userId);
                } else {
                    setErrorMessage('User not found');
                }
            } catch (err) {
                console.log(err);
                setErrorMessage('Error fetching user ID');
            }
        };

        fetchUserId();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://192.168.184.77:3000/api/transaction", {
                reason: reason,
                amount: amount,
                transactionType: transactionType,
                user,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            if (response.status === 201) {
                console.log('Added Transaction Successful');
                navigation.navigate('Transactions');
            } else {
                setErrorMessage('Add Transaction failed!');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Error adding transaction!');
        }
    };

    return (
        <Box flex={1}>
            <Header navigation={navigation} />

            <Center flex={1} px={4}>
                <VStack space={4} w="100%" maxW="400px" borderWidth={1} borderColor="#ccc" borderRadius="lg" p={6} bg="white" shadow={2}>
                    <Heading color="primary.500" textAlign="center" mb={4}>Add Transaction</Heading>

                    {errorMessage ? (
                        <Text color="red.500" textAlign="center">{errorMessage}</Text>
                    ) : null}

                    <Input
                        placeholder="Reason"
                        value={reason}
                        onChangeText={setReason}
                        variant="outline"
                        bg="gray.50"
                        borderColor="primary.400"
                        borderRadius="md"
                        mb={4}
                    />
                    <Input
                        placeholder="Amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        variant="outline"
                        bg="gray.50"
                        borderColor="primary.400"
                        borderRadius="md"
                        mb={4}
                    />

                    <Select
                        selectedValue={transactionType}
                        minWidth="200"
                        accessibilityLabel="Choose Transaction Type"
                        placeholder="Transaction Type"
                        onValueChange={itemValue => setTransactionType(itemValue)}
                        _selectedItem={{
                            bg: "primary.400",
                            endIcon: <CheckIcon size={5} />
                        }}
                        mt={1}
                    >
                        <Select.Item label="Credit" value="credit" />
                        <Select.Item label="Debit" value="debit" />
                    </Select>

                    <Button mt={6} onPress={handleSubmit} bg="primary.500" _hover={{ bg: "primary.600" }}>
                        Add Transaction
                    </Button>
                </VStack>
            </Center>

            <Footer navigation={navigation} />
        </Box>
    );
};

export default AddTransaction;
