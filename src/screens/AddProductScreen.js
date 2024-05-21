import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  const pickImage = () => {
    ImagePicker.showImagePicker((response) => {
        if (!response.didCancel) {
          // Xử lý hình ảnh được chọn ở đây
        }
    });
  };

  const uploadImage = async (imageURI) => {
    try {
      const fileName = productName.replace(/\s+/g, '_').toLowerCase();
      const reference = storage().ref(`images/${fileName}`);
      await reference.putFile(imageURI);
      const url = await reference.getDownloadURL();
      setImageURL(url);
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('An error occurred while uploading the image.');
    }
  };
  
  const addProduct = async () => {
    try {
      await firestore().collection('products').add({
        productName,
        description,
        price: parseFloat(price),
        imageURL,
        category,
        quantity: parseInt(quantity),
      });
      alert('Product added successfully!');
      // Reset fields after adding product
      setProductName('');
      setDescription('');
      setPrice('');
      setImageURL('');
      setCategory('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      {/* Add other input fields for description, price, category, and quantity */}
      {imageURL ? (
        <Image source={{ uri: imageURL }} style={styles.image} />
      ) : (
        <Button title="Select Image" onPress={pickImage} />
      )}
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default AddProductScreen;
