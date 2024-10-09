import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, VStack, Input, Select, CheckIcon, Text, Center } from 'native-base';
import axios from 'axios';
import Header from './Header1';
import Footer from './Footer1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateTransaction = ({ route, navigation }) => {
  const { id } = route.params;
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        console.log("TID : ", id)
        const response = await axios.get(`http://192.168.184.77:3000/api/transaction/tid/${id}`);
        const transaction = response.data;

        setReason(transaction.reason);
        setAmount(transaction.amount.toString());
        setTransactionType(transaction.transactionType);

        const userId = await AsyncStorage.getItem('@userid');
        if (userId !== null) {
          setUser(userId);
        } else {
          setErrorMessage('User not found');
        }


      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to load transaction details');
      }
    };

    fetchTransactionDetails();
  }, [id]);

  const handleUpdateSubmit = async () => {
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount)) {
        setErrorMessage('Amount must be a valid number');
        return;
      }

      const payload = {
        reason: reason,
        amount: parsedAmount,
        transactionType: transactionType,
        user: user,
      };

      console.log('Payload being sent:', payload);

      const response = await axios.put(`http://192.168.184.77:3000/api/transaction/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Transaction updated successfully');
        navigation.navigate('Transactions');
      } else {
        setErrorMessage('Failed to update transaction');
      }
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response);
        setErrorMessage(err.response.data.error || 'Error updating transaction');
      } else if (err.request) {
        console.error('Error request:', err.request);
        setErrorMessage('No response received from server');
      } else {
        console.error('Error message:', err.message);
        setErrorMessage('Error updating transaction');
      }
    }
  };

  return (
    <Box flex={1}>
      <Header navigation={navigation} />

      <Center flex={1} px={4}>
        <VStack space={4} w="100%" maxW="400px" borderWidth={1} borderColor="#ccc" borderRadius="lg" p={6} bg="white" shadow={2}>
          <Heading color="primary.500" textAlign="center" mb={4}>Update Transaction</Heading>

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

          <Button mt={6} onPress={handleUpdateSubmit} bg="primary.500" _hover={{ bg: "primary.600" }}>
            Update Transaction
          </Button>
        </VStack>
      </Center>

      <Footer navigation={navigation} />
    </Box>
  );
};

export default UpdateTransaction;
