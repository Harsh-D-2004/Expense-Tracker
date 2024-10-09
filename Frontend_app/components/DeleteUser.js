import React from 'react';
import { Center, Heading, Button, VStack, Box, Text, HStack } from 'native-base';

export const DeleteUser = ({ navigation }) => {
  return (
    <VStack flex={1} bg="#F7FAFC" px={5} pt={10}>
      
      <HStack bg="blue.500" p={4} justifyContent="center" alignItems="center" w="100%">
        <Heading color="white" size="md">
          User Management
        </Heading>
      </HStack>

      <Center flex={1}>
        <Box 
          bg="white" 
          borderRadius="lg" 
          shadow={3} 
          p={6} 
          w="100%" 
          maxW="400px" 
          alignItems="center"
        >
          <Heading size="lg" mb={4} color="green.700">
            User Deleted Successfully
          </Heading>
          
          <Text fontSize="md" color="gray.600" mb={6} textAlign="center">
            Your account has been successfully deleted. Thank you for using our service.
          </Text>
          
          <Button 
            onPress={() => navigation.navigate('Startup')} 
            colorScheme="blue" 
            size="lg"
            px={8}
          >
            Exit
          </Button>
        </Box>
      </Center>
    </VStack>
  );
};
