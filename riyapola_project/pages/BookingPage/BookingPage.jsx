import { TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from "../../AxiosOrder/AxiosOrder";


export default function BookingPage({ route }) {

  const [selectedCar, setSelectedCar] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [status, setStatus] = useState("waiting");



  useEffect(() => {
    if (route.params == null) {
      console.log("hihi")

    }
    else {
      const { selectedCar } = route.params; // Access passed car object
      setSelectedCar(selectedCar);
    }

  }, [route.params]);




  const bookThisCar = async () => {

    const cusId = await AsyncStorage.getItem('cusId');

    instance.post('/reservation/addNewReservation', {
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      pickUpLocation: pickUpLocation,
      carId: selectedCar.id,
      customerId: cusId,
      status: status

    })
      .then((response) => {
        console.log("sent!gfggfgfgfgf");
        console.log(response.data);

      })
      .catch((error) => {
        console.error("Error saving reservation :", error);
        // Alert.alert("Error:", "An error occurred while saving the student.");
      });


  }


  return (
    <ScrollView>
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text variant="titleLarge" style={styles.headerText}>

              Welcome To Riyapola Booking
            </Text>
          </View>


          {selectedCar && ( // Conditionally render details only if selectedCar exists
            <View style={styles.detailsContainer}>

              <Text style={styles.detailsTitle}>Your Car Details</Text>


              <View style={styles.detailRow}>

                <TextInput style={styles.detailLabel} editable={false}>ID :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.id.toString()}
                  editable={false} // Disable text input

                />
              </View>

              <View style={styles.detailRow}>
                <TextInput style={styles.detailLabel} editable={false}>Brand :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.brand}
                  editable={false}

                />
              </View>


              <View style={styles.detailRow}>
                <TextInput style={styles.detailLabel} editable={false}>Model :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.model}
                  editable={false}

                />
              </View>

              <View style={styles.detailRow}>
                <TextInput style={styles.detailLabel} editable={false}>Year :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.year.toString()}
                  editable={false}

                />
              </View>

              <View style={styles.detailRow}>
                <TextInput style={styles.detailLabel} editable={false}>Engine Capacity :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.engineCap}
                  editable={false}

                />
              </View>

              <View style={styles.detailRow}>
                <TextInput style={styles.detailLabel} editable={false}>Fuel Type :  </TextInput>
                <TextInput
                  style={styles.detailInput}
                  value={selectedCar.fuelType}
                  editable={false}

                />
              </View>

              <Text style={styles.bookingDetailsTitle}>Booking Details</Text>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailLabel}
                  placeholder="Start Date"
                  value={startDate}
                  onChangeText={startDate => setStartDate(startDate)}
                />
              </View>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailLabel}
                  placeholder="Start Time"
                  value={startTime}
                  onChangeText={startTime => setStartTime(startTime)}
                />
              </View>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailLabel}
                  placeholder="End Date"
                  value={endDate}
                  onChangeText={endDate => setEndDate(endDate)}
                />
              </View>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailLabel}
                  placeholder="End Time"
                  value={endTime}
                  onChangeText={endTime => setEndTime(endTime)}
                />
              </View>

              <View style={styles.detailRow}>
                <TextInput
                  style={styles.detailLabel}
                  placeholder="Pick Up Location"
                  value={pickUpLocation}
                  onChangeText={pickUpLocation => setPickUpLocation(pickUpLocation)}
                />
              </View>

              {/* <Text>Image Name: {selectedCar.imageName}</Text> */}
              <Button style={styles.bookButton} mode="contained" onPress={bookThisCar}>
                Book Car
              </Button>


            </View>


          )}

          <Text>please select your car!</Text>


        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: '#fff', // White background for details section
    borderRadius: 10, // Rounded corners for details section
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Add subtle shadow for details section
  },
  detailsTitle: {
    fontSize: 25,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Center details title
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  detailInput: {
    flex: 1,
    backgroundColor: '#f1f1f1', // Light gray background for disabled fields
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',

  },
  bookButton: {

    backgroundColor: "#333", // Change button color to a darker shade
    paddingHorizontal: 30, // Add horizontal padding for better spacing
    paddingVertical: 8, // Add vertical padding for better spacing
    margin: 5

  },
});