import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,FlatList,Image } from 'react-native';
import Header from '../../components/Header';
import COLOR from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';
import Container from '../../components/container';
const Home = ({ navigation }) => {
   
  return (
    <ScrollView>
    <View style={styles.container}>
      <Header />
      <Container />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.blue_black,
  },
});

export default Home;
