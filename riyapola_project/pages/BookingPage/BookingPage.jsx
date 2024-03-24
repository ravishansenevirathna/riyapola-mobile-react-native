import { View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import {
   
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function BookingPage() {

  const [email, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const bookthiscar = () => {
    console.log("hiii");
    
   }



  return (
    <KeyboardAvoidingView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 5 }}>

                Welcome To Riyapola Booking </Text>
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

<Button buttonColor="black" style={styles.btn1} mode="contained" onPress={bookthiscar}>
                Book Car
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
        fontSize: 12, // Adjust font size as needed
        color: 'red',
  },

}); 