import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";


const logOut = async () => {
   
    await AsyncStorage.removeItem('stmToken')
    await AsyncStorage.removeItem('cusId')
    
    console.log("jhyjh")
}


export default function CustomerLogOut() {
    return(
        <View>
            <Text>hi</Text>
            <Button buttonColor="black" mode="contained" onPress={logOut}>
                LogOut
            </Button>

        </View>
    )
}