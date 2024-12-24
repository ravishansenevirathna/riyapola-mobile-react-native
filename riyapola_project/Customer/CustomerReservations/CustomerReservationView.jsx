import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import instance from '../../AxiosOrder/AxiosOrder';

export default function CustomerReservationView(){

    const [data, setData] = useState([]);

    useEffect(() => {
        getReservations();
      }, []);

      const getReservations = async () => {

        const cusId = await AsyncStorage.getItem('cusId');
        console.log("cusId:", cusId);

        instance
          .get('http://192.168.1.4:8080/reservation/searchReservation/'+cusId)
          .then(function (response) {
            console.log(response.data);
            console.log("fgfrghfghfg");
            const array = [];
            response.data.forEach(val => {
              array.push({
                id:val.reservationId,
                startDate: val.startDate,
                startTime: val.startTime,
                endDate: val.endDate,
                endTime: val.endTime,
                pickUpLocation: val.pickUpLocation,
                carId: val.carId,
                status: val.status,
               
              });
            });
            setData(array);
          })
          .catch(function (error) {
            console.log(error);
          });
      };


    return (
      <View>
        <Text>CustomerReservationView</Text>
      </View>
    )
  }
