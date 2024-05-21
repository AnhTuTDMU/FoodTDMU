import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../../constants';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ref = firestore().collection('Products');

  async function addProduct() {
    if (!productName.trim() || !description.trim() || !price.trim() || !category.trim() || !quantity.trim() || !imageURL) {
      setError('Vui lòng nhập dữ liệu');
      return;
    } else {
      setError('');
    }

    try {
      const docRef = await ref.add({
        productName,
        description,
        price: parseFloat(price),
        imageURL,
        category,
        quantity: parseInt(quantity),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
      setProductName('');
      setDescription('');
      setPrice('');
      setImageURL(null);
      setCategory('');
      setQuantity('');
      Alert.alert('Success', 'Product added successfully.');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to add product.');
    }
  }

  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageURL(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Tên món</Text>
          <TextInput
            placeholder="Nhập tên món"
            value={productName}
            onChangeText={text => setProductName(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Miêu tả món</Text>
          <TextInput
            placeholder="Nhập miêu tả món"
            value={description}
            onChangeText={text => setDescription(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Giá tiền</Text>
          <TextInput
            placeholder="Nhập giá tiền"
            value={price}
            onChangeText={text => setPrice(text)}
            style={styles.textInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Danh mục</Text>
          <TextInput
            placeholder="Nhập danh mục"
            value={category}
            onChangeText={text => setCategory(text)}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Số lượng</Text>
          <TextInput
            placeholder="Nhập số lượng"
            value={quantity}
            onChangeText={text => setQuantity(text)}
            style={styles.textInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Button style={{width: 100, backgroundColor: '#F6995C'}} onPress={selectImage}>Chọn ảnh</Button>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.imagePreview} />
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            onPress={addProduct}
          >
            Thêm món ăn
          </Button>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: COLORS.grey,
    height: 50,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  labelText: {
    color: 'black',
    marginBottom: 5,
    textAlign: 'left',
    width: 300,
  },
  buttonContainer: {
    marginBottom: 200,
  },
  addButton: {
    backgroundColor: COLORS.pink,
    width: 300,
    height: 50,
    justifyContent: 'center',
  },
  addButtonContent: {
    height: 40,
  },
  addButtonLabel: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
