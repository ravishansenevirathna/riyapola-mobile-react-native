import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './riyapola_project/pages/Home/HomePage';
import DrawerNav from './riyapola_project/DrawerNavPages/DrawerNav';
import BookingPage from './riyapola_project/pages/BookingPage/BookingPage';
import CustomerLogin from './riyapola_project/Customer/CustomerLogin/CustomerLogin';
import CustomerRegister from './riyapola_project/Customer/CustomerRegister/CustomerRegister';
import CustomerAccount from './riyapola_project/Customer/CustomerAccount/CustomerAccount';




const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after 2 seconds
    }, 100); // Delay for 2 seconds

    // Cleanup function to clear the timer if the component unmounts prematurely
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
      <NavigationContainer>
        <Stack.Navigator>
          

          
          <Stack.Screen name="Drawer" component={DrawerNav} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={CustomerLogin} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={CustomerRegister} options={{headerShown: false}} />
          <Stack.Screen name="BookingPage" component={BookingPage} options={{headerShown: false}} />
          <Stack.Screen name="MyAccount" component={CustomerAccount} options={{headerShown: false}} />



        </Stack.Navigator>
      </NavigationContainer>
  );
}
