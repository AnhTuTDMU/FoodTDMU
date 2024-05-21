import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

const LoginGoogle = ({ navigation }) =>{
    
    GoogleSignin.configure({
        webClientId: '970597021300-db0agp3v8hucdvgmdoq4avq4ilvhkjgd.apps.googleusercontent.com',
    });
      
    const signInWithGoogle = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            Alert.alert('Đăng nhập thành công!');
            navigation.navigate('HomeScreen'); 
        } catch (error) {
            console.error('Lỗi đăng nhập bằng Google: ', error);
            Alert.alert('Đăng nhập không thành công. Vui lòng thử lại.');
        }
    };

    return(
        <TouchableOpacity onPress={signInWithGoogle} style={styles.button}>
            <View style={styles.buttonContent}>
                <Image
                    source={require('../../assets/Image/google.jpg')}
                    style={styles.icon}
                />
                <Text style={styles.buttonText}>Đăng nhập bằng Google</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
        width: 200,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10, 
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
    },
});

export default LoginGoogle;
