import { View } from "react-native";
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import {
   
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function CustomerLogin() {

    const [email, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    

        const loginCustomer = async () => {
            try{
            const response = await instance.post('/customer/login', { email: email, password: password });
            }catch(e){
                console.log(c);
                
            }
            const data = response.data;
            await AsyncStorage.setItem('stmToken', data.token)
            const token = await AsyncStorage.getItem('stmToken')
            if(token!=null){
    
            }
            // navigation.navigate('DrawerNav')
            
            
    
        }
        
    

    return(
        <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Text variant="headlineMedium">Customer Login</Text>

            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter Email"
                value={email}
                onChangeText={email => setMail(email)}
            />

            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter New Password"
                value={password}
                onChangeText={password => setPassword(password)}
            />

            <Button buttonColor="black" style={styles.btn1} mode="contained" onPress={loginCustomer}>
                Login
            </Button>


        </View>
         </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    txt: {
        margin: 40
    },
    btn1: {
        buttonColor: "green",
        margin: 20,


    },
    regi: {
        height: 40,
        justifyContent: 'center',

    }

}); 