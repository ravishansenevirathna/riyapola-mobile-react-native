import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BookingPage from '../pages/BookingPage/BookingPage';
import CustomerAccount from '../Customer/CustomerAccount/CustomerAccount';
import Car from '../pages/Cars/Car'
import CustomerLogOut from '../Customer/CustomerLogOut/CustomerLogOut';
import CustomerReservationView from '../Customer/CustomerReservations/CustomerReservationView';

const Drawer = createDrawerNavigator();


export default function DrawerNav() {
  return (
    <Drawer.Navigator>


      <Drawer.Screen name="Rent" component={Car} />
      <Drawer.Screen name="Booking" component={BookingPage} />
      <Drawer.Screen name="MyAccount" component={CustomerAccount} />
      <Drawer.Screen name="My Old Reservations" component={CustomerReservationView} />
      <Drawer.Screen name="LogOut" component={CustomerLogOut} />

    </Drawer.Navigator>
  )
}