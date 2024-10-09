import React from 'react';
import { Center, Heading, Button, HStack, VStack, Image } from 'native-base';
import Logo from '../images/Logo.png'

const StartupScreen = ({ navigation }) => {

    return (
        <Center flex={1} bg="primary.100" px={4}>

            <Image
                source={{uri : 'https://play-lh.googleusercontent.com/nn3jXKaItb-nryaw47o1-6diQ1OckdBnI_TO8MJB4GpMRB6pkmi1SjsVDihqpWqeC9xa'}}
                alt="App Logo"
                size="xl"
                mb={6}
            />

            <Heading color="primary.800" mb={12}>
                Expense Tracker
            </Heading>

            <HStack space={4} mb={8}>
                <Button 
                    flex={1} 
                    onPress={() => navigation.navigate('Login')} 
                    colorScheme="blue"
                >
                    Login
                </Button>
                <Button 
                    flex={1} 
                    onPress={() => navigation.navigate('Signup')} 
                    colorScheme="green"
                >
                    SignUp
                </Button>
            </HStack>

            <Button
                onPress={() => console.log('Google Login')} 
                colorScheme="red"
                variant="outline"
                width="100%"
            >
                Login with Google
            </Button>
        </Center>
    );
}

export default StartupScreen;
