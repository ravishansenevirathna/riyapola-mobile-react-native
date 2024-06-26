import { View } from "react-native";
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {
   
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../../AxiosOrder/AxiosOrder";
import { useState } from "react";



export default function CustomerLogin({navigation}) {

    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");

    

        const loginCustomer = async () => {
            
            const response = await instance.post('/customer/login', { email: email, password: password });
            console.log(response.data.token);
            console.log(response.data.customerId);
            
            const data = response.data;
            await AsyncStorage.setItem('stmToken', data.token)
            await AsyncStorage.setItem('cusId',data.customerId)
            const token = await AsyncStorage.getItem('stmToken')
            const cusId = await AsyncStorage.getItem('cusId')

            console.log(token);
            console.log(cusId);

            navigation.navigate("Drawer")
            // if(token!=null){
            //     navigation.navigate("Drawer")
            // }
            
            
            
    
        }

        const registerCustomer = () => {
            navigation.navigate("Register");
          }

        
    

    return(
        <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 5 }}>

                Welcome To Riyapola Login</Text>
            </View>

            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter Your Email"
                value={email}
                onChangeText={email => setMail(email)}
            />

            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter Your Password"
                value={password}
                onChangeText={password => setPassword(password)}
            />

            <Button buttonColor="black" style={styles.btn1} mode="contained" onPress={loginCustomer}>
                Login
            </Button>
            <Text style={styles.smallRedText}>Don't Have an Account?</Text>
            <Button buttonColor="black" style={styles.btn1} mode="contained" onPress={registerCustomer}>
                Register
            </Button>



        </View>
         </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    txt: {
        margin: 20
    },
    btn1: {
      
        margin: 12,


    },
    regi: {
        height: 40,
        justifyContent: 'center',

    },
        smallRedText: {
          fontSize: 12, 
          color: 'red',
    },

}); 