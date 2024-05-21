import 'react-native-gesture-handler';
import React from 'react';
import { useMyContextController } from '../context';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './LoginScreen';
import HomeScreen from './HomeScreen';
import Admin from './AdminHome';
import Register from './RegisterScreen';
import Setting from './SetingScreen';  
import COLORS from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FavoruiteScreen from './FavouriteScreen';
import OrderScreen from './OrderScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AdminScreens = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: COLORS.blue },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name="Home"
      component={Admin}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const UserScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: COLORS.blue },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SettingScreens = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: COLORS.pink },
    }}
  >
    <Stack.Screen
      name="SettingScreen"
      component={Setting}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const Router = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  return (
    <>
      {userLogin ? (
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            tabBarActiveTintColor: COLORS.orange,
            headerShown: false,
            tabBarShowLabel: true,
            tabBarStyle:{
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,
              borderRadius: 15,
              height: 70,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
            },
          }}
        >
          {userLogin.role === 'admin' ? (
            <Tab.Screen
              name="Admin"
              component={AdminScreens}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="house" color={color} size={size}  />
                ),
                title: 'Home',
              }}
            />
          ) : (
            <>
              <Tab.Screen
                name="HomeScreen"
                component={UserScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="house" color={color} size={size}/>
                  ),
                  title: 'Trang chủ'
                }}
              />
               <Tab.Screen
                name="Favourite"
                component={FavoruiteScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="heart" color={color} size={size} />
                  ),
                  title: 'Yêu thích',
                }}
              />
                <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                  tabBarBadge: 3,
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="star" color={color} size={size} />
                  ),
                  title: 'Đặt hàng',
                }}
              />
              <Tab.Screen
                name="Setting"
                component={SettingScreens}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="gears" color={color} size={size} />
                  ),
                  title: 'Cài đặt',
                }}
              />
             
            </>
          )}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Router;
