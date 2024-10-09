import React from 'react';
import { HStack, Button } from 'native-base';

const Footer = ({ navigation }) => {
    return (
        <HStack bg="primary.100" px={4} py={3} justifyContent="space-between" alignItems="center">
            
            <Button
                flex={1}
                onPress={() => navigation.navigate('Transactions')}
                bg="primary.500"
                mr={2}
            >
                Transactions
            </Button>

            <Button
                flex={1}
                onPress={() => navigation.navigate('Goals')}
                bg="primary.500"
                ml={2}
            >
                Goals
            </Button>

        </HStack>
    );
}

export default Footer;
