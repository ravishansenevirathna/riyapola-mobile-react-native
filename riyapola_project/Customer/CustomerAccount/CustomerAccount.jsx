import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import instance from "../../AxiosOrder/AxiosOrder";
import {
  Card,
} from 'react-native-paper';




export default function CustomerAccount() {

  const [customerData, setCustomerData] = useState('');
  const [editMode, setEditMode] = useState(false);

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

    instance.put('/customer/updateCustomer/' + cusId,customerData)
      .then(function (response) {
        console.log("hhhhhhhhh")
        console.log("response:", response);
        console.log("response data:", response.data);
        setEditMode(false);

      })
      .catch(function (error) {
        console.error("Error updating customer data:", error);
      })
}

const toggleEditMode = () => {
  setEditMode(!editMode);
};



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="My Information" />
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
          </>
        ) : ( // Display customer details in display mode
          <>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{customerData.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{customerData.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone Number:</Text>
              <Text style={styles.detailValue}>
                {customerData.telephoneNum}
              </Text>
            </View>
          </>
        )}
      </Card.Content>
      <Button
        buttonColor={editMode ? "primary" : "black"} // Change button color based on mode
        mode="contained"
        onPress={editMode ? updateAccount : toggleEditMode}
      >
        {editMode ? "Save Changes" : "Edit Account"}
      </Button>
</Card>
</ScrollView>
</SafeAreaView>
);
};


      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        card: {
          padding: 15,
        },
        detailRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        },
        detailLabel: {
          fontWeight: "bold",
        },
        detailValue: {
          flex: 1,
        },
        detailInput: {
          flex: 1,
          marginLeft: 10,
        },
      });