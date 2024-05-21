import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import COLOR from '../constants';

const Container = (navigation) => {
  const [monNuoc, setMonNuoc] = useState([]);
  const [monKho, setMonKho] = useState([]);

  useEffect(() => {
    const unsubscribeMonNuoc = firestore().collection('Products')
      .where('category', '==', 'Món Nước')
      .onSnapshot(snapshot => {
        const productsData = [];
        snapshot.forEach(doc => {
          const { imageURL, productName, price } = doc.data();
          productsData.push({
            id: doc.id,
            image: imageURL,
            name: productName,
            price: price,
          });
        });
        setMonNuoc(productsData);
      });

    const unsubscribeMonKho = firestore().collection('Products')
      .where('category', '==', 'Món Khô')
      .onSnapshot(snapshot => {
        const productsData = [];
        snapshot.forEach(doc => {
          const { imageURL, productName, price } = doc.data();
          productsData.push({
            id: doc.id,
            image: imageURL,
            name: productName,
            price: price,
          });
        });
        setMonKho(productsData);
      });

    return () => {
      unsubscribeMonNuoc();
      unsubscribeMonKho();
    };
  }, []);

  const formatPriceToVND = price => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="cover" />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryPrice}>{formatPriceToVND(parseFloat(item.price))}</Text>
    </TouchableOpacity>
  );

  const renderProductItem2 = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="cover" />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryPrice}>{formatPriceToVND(parseFloat(item.price))}</Text>
    </TouchableOpacity>
  );
  const handleImagePress = () => {
 
  };

  return (
    <View>
      <Text style={{ color: COLOR.white, fontSize: 22, paddingLeft: 20, paddingTop: 10}}>DANH MỤC MÓN</Text>
      <View style={styles.underline} />
      <Text style={{ color: COLOR.orange, fontSize: 20, paddingLeft: 20 }}>Món Nước</Text>
      <FlatList
        data={monNuoc}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.categoryList}
      />
       <View style={styles.underline} />
      <Text style={{ color: COLOR.orange, fontSize: 20, paddingLeft: 20 }}>Món Khô</Text>
      <FlatList
        data={monKho}
        renderItem={renderProductItem2}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.categoryList1}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  categoryList: {
    height: 250,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  categoryList1:{
    height: 250,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 200
  },
  categoryItem: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  categoryName: {
    color: COLOR.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  categoryPrice: {
    color: COLOR.white,
    textAlign: 'center',
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 30 / 2,
    overflow: 'hidden',
  },
  underline: {
    height: 2,
    backgroundColor: '#F1F1F1',
    marginTop: 6,
    width: '90%',
    marginLeft: 20, 
  }
});
