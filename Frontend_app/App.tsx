import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import SignupScreen from './components/Signup_Page.js';
import TransactionScreen from './components/Transaction.js';
import StartupScreen from './components/Startup.js';
import LoginScreen from './components/Login.js';
import AddTransaction from './components/AddTransaction.js';
import UpdateTransaction from './components/UpdateTransaction.js';
import DeleteTransaction from './components/DeleteTransaction.js';
import ProfileScreen from './components/Profile.js';
import { DeleteUser } from './components/DeleteUser.js';
import { UpdateUser } from './components/UpdateUser.js';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Startup">
          <Stack.Screen
            name="Startup"
            component={StartupScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: 'Signup Page',
            }}
          />
          <Stack.Screen
            name="Transactions"
            component={TransactionScreen}
            options={{
              title: 'Transactions',
            }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransaction}
            options={{
              title: 'AddTransaction',
            }}
          />
          <Stack.Screen
            name="UpdateTransaction"
            component={UpdateTransaction}
            options={{
              title: 'UpdateTransaction',
            }}
          />
          <Stack.Screen
            name="DeleteTransaction"
            component={DeleteTransaction}
            options={{
              title: 'DeleteTransaction',
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: 'Profile',
            }}
          />
          <Stack.Screen
            name="DeleteUser"
            component={DeleteUser}
            options={{
              title: 'Delete User',
            }}
          />
          <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{
              title: 'Update User',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
