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
import instance from "../../AxiosOrder/AxiosOrder";

export default function CustomerRegister({navigation}) {

    const [name, setName] = React.useState("");
    const [telephoneNum, setTelephoneNum] = React.useState("");
    const [email, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const saveCustomer = () => {


        let errorMessages = [];

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email format

        if (name.length === 0) {
            errorMessages.push("Please Enter Your Name.");
          }

        if (telephoneNum.length !== 10) {
            errorMessages.push("Invalid Contact Number");
          }

        if (!emailRegex.test(email)) {
            errorMessages.push("Invalid Email Address");
          }

        if (password.length === 0 || password.length <=3) {
            errorMessages.push("Please Give a Strong Password");
          }


        if (errorMessages.length > 0) {
            const errorMessage = errorMessages.join("\n"); // Combine error messages for readability
            Alert.alert("Warning!", errorMessage);
            return;
          }

          instance.post('/customer/register', {
            name: name,
            telephoneNum: telephoneNum,
            email: email,
            password: password
          })
          .then((response) => {
            console.log("saved!");
            console.log(response.data);
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.error("Error saving student:", error);
            // Alert.alert("Error:", "An error occurred while saving the student.");
          });
    }


    return(
        <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 5 }}>

                Welcome To Riyapola Register </Text>
            </View>
            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter Name"
                value={name}
                onChangeText={name => setName(name)}
            />

            <TextInput
                style={styles.txt}
                mode="outlined"
                label="Enter Phone Number"
                value={telephoneNum}
                onChangeText={telephoneNum => setTelephoneNum(telephoneNum)}
            />

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

            <Button buttonColor="black" style={styles.btn1} mode="contained" onPress={saveCustomer}>
                Register
            </Button>
           


        </View>
         </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    txt: {
        margin: 15
    },
    btn1: {
        buttonColor: "green",
        margin: 10,


    },
    regi: {
        height: 40,
        justifyContent: 'center',

    }

}); 