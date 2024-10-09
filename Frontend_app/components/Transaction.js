import React, { useState, useEffect } from 'react';
import { Center, Heading, Button, HStack, VStack, Box, Text, Image, ScrollView , Pressable } from 'native-base';
import Header from './Header1.js';
import Footer from './Footer1.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [balance, setBalance] = useState();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('@userid');
        console.log("Transactions : " , userId)
        if (userId !== null) {
          setUser(userId);
          const res = await axios.get(`http://192.168.184.77:3000/api/users/uid/${userId}`)
          setBalance(res.data.balance)
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

  const handleGetTransactions = async () => {
    try {
      const response = await axios.get(`http://192.168.184.77:3000/api/transaction/${user}`);
      if (response.status === 200) {
        console.log(response.data)
        setTransactions(response.data);
        const res = await axios.get(`http://192.168.184.77:3000/api/users/uid/${user}`)
        setBalance(res.data.balance)
      } else {
        setErrorMessage('Failed to fetch transactions');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Error fetching transactions');
    }
  };

  const handleUpdateTransaction = (id) => {
    console.log(id);
    navigation.navigate('UpdateTransaction', { id: id });
  };

  const handleDeleteTransaction = (id) => {
    navigation.navigate('DeleteTransaction', { id: id });
  };

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  return (
    <Box flex={1} bg="gray.100">
      <Header navigation={navigation} />

      <ScrollView flex={1} px={4} mt={4}>
        <Center>
          <HStack space={6} alignItems="center">
            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
                source={{ uri: 'https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/907452f41e7ca94602511d13f60516bc.jpg' }}
                alt="Pie Chart"
                size="xl"
                resizeMode="cover"
                borderRadius="md"
                shadow={3}
              />
            </Pressable>

            <Box bg="primary.200" borderRadius="lg" p={4} shadow={2}>
              <Heading size="sm" mb={4} color="black">View Transactions By:</Heading>
              <VStack space={4}>
                <Button variant="outline" onPress={() => console.log('Weekly')}>Weekly</Button>
                <Button variant="outline" onPress={() => console.log('Monthly')}>Monthly</Button>
                <Button variant="outline" onPress={() => console.log('Daily')}>Daily</Button>
                <Button variant="outline" onPress={() => console.log('Yearly')}>Yearly</Button>
              </VStack>
            </Box>
          </HStack>

          <Center mt={6}>
            <Box bg="primary.100" p={4} borderRadius="md" shadow={3}>
              <Heading size="lg" color="primary.600" fontWeight="bold" textAlign="center">
                Balance :
                <Text color="green.500" fontWeight="bold">
                  {balance}
                </Text>
              </Heading>
            </Box>
          </Center>

          <HStack mt={6} space={4} justifyContent="center">
            <Button width="45%" onPress={() => handleAddTransaction()} bg="primary.600" _text={{ color: 'white' }}>
              Add Transaction
            </Button>
            <Button width="45%" onPress={() => handleGetTransactions()} variant="outline" borderColor="primary.600">
              Refresh Transactions
            </Button>
          </HStack>

          {transactions.length > 0 ? (
            <VStack mt={6} space={4} w="100%">
              {transactions.map(transaction => (
                <Box
                  key={transaction._id}
                  bg="primary.50"
                  p={4}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="primary.300"
                  shadow={1}
                >

                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack>
                      <Text bold>{transaction.reason}</Text>
                      <Text color="gray.600">{transaction.amount}</Text>
                      <Text color="gray.400">{transaction.transactionType}</Text>
                      <Text color="gray.400">{new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</Text>
                      <Text color="gray.400">{new Date(transaction.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}</Text>
                    </VStack>

                    <HStack space={2}>
                      <Button
                        onPress={() => handleUpdateTransaction(transaction._id)}
                        bg="info.500"
                        _hover={{ bg: 'info.600' }}
                        _text={{ color: 'white' }}
                        borderRadius="full"
                      >
                        Update
                      </Button>

                      <Button
                        onPress={() => handleDeleteTransaction(transaction._id)}
                        bg="danger.500"
                        _hover={{ bg: 'danger.600' }}
                        _text={{ color: 'white' }}
                        borderRadius="full"
                      >
                        Delete
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text mt={4} fontSize="lg" color="gray.500">No transactions found.</Text>
          )}
        </Center>
      </ScrollView>

      <Footer navigation={navigation} />
    </Box>
  );
};

export default TransactionScreen;
