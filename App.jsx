import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { PaperProvider } from 'react-native-paper';
import MainPage from "./riyapola_project/pages/MainPage/MainPage";
import AxiosOrder from "./riyapola_project/pages/Axios/AxiosOrder";
import SplashScreen from 'react-native-splash-screen'
import CustomerRegister from "./riyapola_project/Customer/CustomerRegister/CustomerRegister";
import CustomerLogin from "./riyapola_project/Customer/CustomerLogin/CustomerLogin";


export default function App(){
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after 2 seconds
    }, 500); // Delay for 2 seconds

    // Cleanup function to clear the timer if the component unmounts prematurely
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs only once on component mount

  return(
   
     <View>
     
    {/* <MainPage/> */}
    {/* <AxiosOrder/> */}
    {/* <CustomerRegister/> */}
    <CustomerLogin/>
    </View>
  
   
  )
}