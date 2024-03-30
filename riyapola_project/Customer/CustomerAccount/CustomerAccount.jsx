import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import instance from "../../AxiosOrder/AxiosOrder";
import {
  Card,
} from 'react-native-paper';



export default function CustomerAccount() {

  const [customerData, setCustomerData] = useState('');

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

    instance.put('/customer/updateCustomer/' + cusId)
      .then(function (response) {
        console.log("response:", response);
        console.log("response data:", response.data);

      })
      .catch(function (error) {
        console.error("Error updating customer data:", error);
      })
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="My Information" />
          <Card.Content>

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
              <Text style={styles.detailValue}>{customerData.telephoneNum}</Text>
            </View>
          </Card.Content>
          <Button buttonColor="black" mode="contained" onPress={updateAccount}>
            Update My Account
          </Button>

        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    flex: 1,
  },
});