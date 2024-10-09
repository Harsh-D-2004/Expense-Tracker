import React from 'react';
import { HStack, Heading, Image, IconButton, Avatar, Spacer } from 'native-base';
import { Pressable } from 'react-native';

const Header = ({ navigation }) => {

    return (
        <HStack bg="primary.100" px={4} py={3} alignItems="center">

            <Pressable onPress={() => navigation.navigate('Transactions')}>
                <Image
                    source={{uri : 'https://play-lh.googleusercontent.com/nn3jXKaItb-nryaw47o1-6diQ1OckdBnI_TO8MJB4GpMRB6pkmi1SjsVDihqpWqeC9xa'}}
                    alt="App Logo"
                    size="xs"
                    mr={4}
                />
            </Pressable>

            <Heading flex={1} textAlign="center" color="primary.800"  paddingLeft={10}>
                Expense Tracker
            </Heading>

            <Spacer />

            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
                <Avatar
                    source={{ uri: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }}
                    size="md"
                    ml={4}
                />
            </Pressable>
        </HStack>
    );
}

export default Header