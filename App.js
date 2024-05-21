import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import Router from "./src/screens/Router"
import { MyContextControllerProvider} from "./src/context";
import Login from './src/screens/LoginScreen';
import Register from './src/screens/RegisterScreen';

const initial = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    name: "admin",
    phone: "0123456789",
    address: "Binh Duong",
    email: "AnhTuAdmin@gmail.com",
    password: "AnhTuAdmin",
    role: "admin"
  }
  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() => {
          USERS.doc(admin.email).set(admin)
          console.log("Add new user admin!")
        })
       
    }
  })
}

const App = () => {
  useEffect(() => {
    initial()
  }, [])
  return (
    <PaperProvider>
    <MyContextControllerProvider>
      <NavigationContainer>
       <Router>
       </Router>
      </NavigationContainer>
    </MyContextControllerProvider>
  </PaperProvider>
  );
};

export default App;
