import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import { Avatar, Button, Card, Text } from 'react-native-paper';



export default function AxiosOrder() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();

    }, []);

    const getData = () => {
        axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
            .then(function (response) {
                console.log(response.data)
                const array = []
                response.data.forEach(val => {
                    array.push({
                        id:val.id,
                        carBrand:val.brand,
                        carModel:val.model,
                        carYear:val.year
                    })
                })
               
            })
            .catch(function (error) {
                console.log(error);
                setLoading(true);
            })
    }

   

    return (
        <View>
           
            <ScrollView>
            <Card style={{margin:10}}>
                <Card.Content style={{flex:1}}>
                    <View style={{flex:2}}>
                      <Avatar.Image size={70} source={{uri:"https://pagalladka.com/wp-content/uploads/2018/06/26000867_1906914719637500_8153816942290715635_n-500x500.jpg"}}/>
                        <Text>hihghgh</Text>
                    </View>
                    
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
            
            </ScrollView>
            
        </View>

    )
}