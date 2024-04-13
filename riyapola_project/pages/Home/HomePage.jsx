import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView,TouchableOpacity,StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function HomePage({navigation}) {
  const [data, setData] = useState([]);

  const login = () => {
   navigation.navigate("Login");
  }

    const booking = () => {
    
      navigation.navigate("Login");
           
   }


  useEffect(() => {
    getData();
  }, []);

  

  const getData = async () => {
    const token = await AsyncStorage.getItem('stmToken')
    if(token!=null){
          navigation.navigate("Drawer")
      }
      else{
    

    
    
    axios
      .get('http://192.168.1.6:8080/car/getAllCars')
      .then(function (response) {
        console.log(response.data);
        const array = [];
        response.data.forEach(val => {
          array.push({
            id:val.carId,
            brand: val.brand,
            model: val.model,
            year: val.year,
            engineCap: val.engineCap,
            fuelType: val.fuelType,
            imageName: val.images[0].imageName,
          });
        });
        setData(array);
      })
      .catch(function (error) {
       
        console.log(error);
        
        // setLoading(true);
      });
  }
}

  const Card1 = ({ brand, model, year, engineCap, fuelType, imageName }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          {/*<Avatar.Image size={70} source={{uri: imageName}} />*/}
          <Text variant="titleLarge">{brand + '.' + model + '.' + year}</Text>
          <Text>{engineCap + '.' + fuelType}</Text>
        </View>
      </Card.Content>
      <Card.Cover source={{ uri: `http://192.168.1.6:8080/${imageName}` }} />
      <Card.Actions>
      <Text style={styles.smallRedText}>Available</Text>
        
        <Button onPress={booking}>Book</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Content>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="titleLarge" style={{ fontWeight: 'bold', borderWidth: 2, borderColor: 'black', padding: 6 }}>

                Welcome To Riyapola</Text>
            </View>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://www.freevector.com/uploads/vector/preview/27662/rental.jpg' }} style={{ margin: 18 }} />
          
        </Card>

        <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


        {/* Flat list ekedi ScrollView ekak auto hadenawa , eka nisa methanadi eka ain karanawa */}
        <FlatList

          data={data}
          renderItem={({ item }) => (
            <Card1
              brand={item.brand}
              model={item.model}
              year={item.year}
              engineCap={item.engineCap}
              fuelType={item.fuelType}
              imageName={item.imageName}
            />
          )}
          keyExtractor={item => item.id}
        />


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: 'black',
    padding: 10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:100,
    flex:2,
    fontWeight:"bold",
    margin:13
   

  },
  buttonText: {
    color: 'white', // Text color within the button
    fontSize: 16,
  },
  smallRedText: {
    fontSize: 20, // Adjust font size as needed
    color: 'green',
    fontWeight: 'bold',
   
    
},


});