import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const ProfileScreen = ({ navigation }) =>{
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth().onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return unsubscribe;
    }, []);
  
    const handleLogout = () => {
      auth()
        .signOut()
        .then(() => {
          console.log('Đăng xuất thành công');
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Đăng xuất không thành công:', error);
        });
    };
    return(
        <View>
        {user ? (
          <View >
            <Text>Welcome, {user.email}!</Text>
            <TouchableOpacity onPress={handleLogout}>
            <Text
              style={{
                padding: 13,
                textAlign: 'center',
                color: 'white',
                margin: 20,
                backgroundColor: 'orange',
                borderRadius: 10,
                fontSize: 18
              }}>
              <AwesomeIcon name="sign-out" size={18} color="white" /> Đăng xuất
            </Text>
          </TouchableOpacity>
          </View>
        ) : (
          <Text>Welcome!</Text>
        )}
      </View>
    )

}

export default ProfileScreen;