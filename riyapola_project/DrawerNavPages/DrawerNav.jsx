import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../pages/Home/HomePage';
import BookingPage from '../pages/BookingPage/BookingPage';
import CustomerAccount from '../Customer/CustomerAccount/CustomerAccount';


const Drawer = createDrawerNavigator();


export default function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Riyapola" component={HomePage} />
      <Drawer.Screen name="Booking" component={BookingPage} />
      <Drawer.Screen name="MyAccount" component={CustomerAccount} />

    </Drawer.Navigator>
  )
}