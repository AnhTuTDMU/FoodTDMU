import React from 'react';
import { Text, View,ScrollView} from "react-native";
import AddSlide from "./AddSlideScreen"
const AdminScreen = () =>{
    return(
        <ScrollView>
        <View style={{ flex: 1 }}>
          <Text>Chào Admin</Text>
          <AddSlide />
        </View>
      </ScrollView>
    )
}

export default AdminScreen;