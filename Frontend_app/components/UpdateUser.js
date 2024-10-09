import React from 'react';
import { Center, Heading, Button, VStack, Box, Text, HStack } from 'native-base';

export const UpdateUser = ({ navigation }) => {
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
            User Updated Successfully
          </Heading>
          
          <Text fontSize="md" color="gray.600" mb={6} textAlign="center">
            Your profile has been updated successfully.
          </Text>
          
          <Button 
            onPress={() => navigation.navigate('ProfileScreen')} 
            colorScheme="blue" 
            size="lg"
            px={8}
          >
            Go Back to Profile
          </Button>
        </Box>
      </Center>
    </VStack>
  );
};
