import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";



const logOut = async () => {
   
    await AsyncStorage.removeItem('stmToken')
    await AsyncStorage.removeItem('cusId')
    console.log("Logged Out Successfully!");
    
};


export default function CustomerLogOut({navigation}) {
    return(
        <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to log out?</Text>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          logOut();
          navigation.navigate("Homee"); // Navigate to Login screen after logout
        }}
      >
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      backgroundColor: "#f5f5f5", // Light background color
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20, // Add some margin below the title
    },
    button: {
      backgroundColor: "#333", // Change button color to a darker shade
      paddingHorizontal: 30, // Add horizontal padding for better spacing
      paddingVertical: 10, // Add vertical padding for better spacing
    },
  });
