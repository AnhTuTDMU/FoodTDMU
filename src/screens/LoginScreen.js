// src/screens/LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useMyContextController, login} from '../context';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginGoogle from './LoginGoogle';
import COLOR from '../../constants'
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [, dispatch] = useMyContextController();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập email và mật khẩu.');
      return;
    }
    login(dispatch, email, password);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffff'}}>
      <View style={{padding: 10}}>
        <View style={{alignItems: 'center', margin: 20}}>
          <Image
            resizeMode="contain"
            source={require('../../assets/Image/LogoFoodTDMU.png')}
            style={{width: '100%', height: focused ? 0 : 200}}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{margin: 10}}>
                  {passwordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={{
                padding: 13,
                textAlign: 'center',
                color: 'white',
                backgroundColor: '#0C359E',
                borderRadius: 10,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <LoginGoogle navigation={navigation} />

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                padding: 10,
                textAlign: 'center',
                color: '#000',
                borderRadius: 10,
              }}>
              Create new account!
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
