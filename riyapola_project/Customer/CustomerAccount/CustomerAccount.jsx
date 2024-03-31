import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useRef } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import instance from "../../AxiosOrder/AxiosOrder";
import {
  Card,
} from 'react-native-paper';





export default function CustomerAccount({navigation}) {

  const [customerData, setCustomerData] = useState('');
  const [editMode, setEditMode] = useState(false);
  const passwordInputRef = useRef(null); // Ref for password input

  useEffect(() => {
    getCustomerData();
  }, []);



  const getCustomerData = async () => {

    const cusId = await AsyncStorage.getItem('cusId');
    console.log("cusId:", cusId);

    instance.get('/customer/searchCustomer/' + cusId)
      .then(function (response) {
        console.log("response:", response);
        console.log("response data:", response.data);
        setCustomerData(response.data);

      })
      .catch(function (error) {
        console.error("Error fetching customer data:", error);
      })
  };

  const updateAccount = async () => {

    const cusId = await AsyncStorage.getItem('cusId');
    console.log("cusId:", cusId);

    instance.put('/customer/updateCustomer/' + cusId, customerData)
      .then(function (response) {
        console.log("hhhhhhhhh")
        console.log("response:", response);
        console.log("response data:", response.data);
        setEditMode(false);
        navigation.navigate("Drawer");

      })
      .catch(function (error) {
        console.error("Error updating customer data:", error);
      })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete Account Confirmation",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Yes", onPress: () => deleteAccount() },
      ]
    );
  };




  const deleteAccount = async () => {
    const cusId = await AsyncStorage.getItem('cusId');
    console.log("cusId:", cusId);

    instance.delete('/customer/deleteCustomer/' + cusId)
      .then(function (response) {
        console.log("response:", response);
        console.log("response data:", response.data);
        navigation.navigate("Homee");

      })
      .catch(function (error) {
        console.error("Error deleting customer :", error);
      })

  }

  



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={styles.centeredTitle}>
        <Text>My Information</Text>
           </View>

        <Card style={styles.card}>
       
          <Card.Content>
            {editMode ? ( // Conditionally render input fields in edit mode
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Name:</Text>
                  <TextInput
                    style={styles.detailInput}
                    value={customerData.name}
                    onChangeText={(text) =>
                      setCustomerData({ ...customerData, name: text })
                    }
                  />
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <TextInput
                    style={styles.detailInput}
                    value={customerData.email}
                    onChangeText={(text) =>
                      setCustomerData({ ...customerData, email: text })
                    }
                  />
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone Number:</Text>
                  <TextInput
                    style={styles.detailInput}
                    value={customerData.telephoneNum}
                    onChangeText={(text) =>
                      setCustomerData({
                        ...customerData,
                        telephoneNum: text,
                      })
                    }
                  />
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>New Password:</Text>
                  <TextInput
                    
                    ref={passwordInputRef}
                    style={styles.detailInput}
                    
                    secureTextEntry={true} // Hide password characters
                    keyboardType="default"
                    onChangeText={(text) => {
                      setCustomerData({ ...customerData, password: text });
                    }}
                  />
                </View>


              </>
            ) : ( // Display customer details in display mode
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Name : </Text>
                  <Text style={styles.detailValue}>{customerData.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email : </Text>
                  <Text style={styles.detailValue}>{customerData.email}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone Number : </Text>
                  <Text style={styles.detailValue}>
                    {customerData.telephoneNum}
                  </Text>
                </View>
              </>
            )}
          </Card.Content>
          <Button
            style={styles.button}
            buttonColor={editMode ? "primary" : "black"} // Change button color based on mode
            mode="contained"
            onPress={editMode ? updateAccount : toggleEditMode}
          >
            {editMode ? "Save Changes" : "Edit Account"}
          </Button>
          <Button onPress={confirmDeleteAccount} style={styles.buttonDel} >Delete My Account</Button> 
          
        </Card>
       
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 25,
    backgroundColor: '#fff', // White card background
    borderRadius: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    flex: 1,
    color: 'blue',
    fontSize: 18,

  },
  detailInput: {
    flex: 1,
    marginLeft: 20,
    height: 40,

  },

  button: {
    backgroundColor: "#333", // Change button color to a darker shade
    paddingHorizontal: 25, // Add horizontal padding for better spacing
    paddingVertical: 5, // Add vertical padding for better spacing
  },
  buttonDel:{
    backgroundColor: "#333", // Change button color to a darker shade
    paddingHorizontal: 20, // Add horizontal padding for better spacing
    paddingVertical: 5, // Add vertical padding for better spacing
    margin:50
  },


  centeredTitle: {
    alignItems: 'center',
    fontSize: 18,
    // ????????
    
          
  },
  


});