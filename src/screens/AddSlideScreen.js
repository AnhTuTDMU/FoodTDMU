import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import COLORS from '../../constants';

const AddSlides = () => {
  const [nameSlide, setNameSlide] = useState('');
  const [SlideError, setSlideError] = useState('');
  const [loading, setLoading] = useState(true);
  const ref = firestore().collection('Slide');
  const [imageUri, setImageUri] = useState(null);

  async function AddSlide() {
    if (nameSlide.trim() === '') {
      setSlideError('Hãy nhập tên ảnh.');
      return;
    } else {
      setSlideError('');
    }
    let imageUrl = '';
    if (imageUri) {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
      const task = storage().ref(filename).putFile(uploadUri);
      try {
        await task;
        imageUrl = await storage().ref(filename).getDownloadURL();
      } catch (e) {
        console.error(e);
      }
    }
    await ref.add({
      title: nameSlide,
      imageUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setNameSlide('');
    setImageUri(null);
    Alert.alert('Thêm Slide thành công');
  }
  const selectImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };
  useEffect(() => {
    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, imageUrl, createdAt} = doc.data();
        list.push({
          id: doc.id,
          title,
          imageUrl,
          createdAt,
        });
      });
      setNameSlide(list);

      if (loading) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  if (loading) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>

        <Text style={styles.labelText}>Tên Silde</Text>
        <TextInput
          placeholder="Nhập tên Silde"
          value={nameSlide}
          onChangeText={text => setNameSlide(text)}
          style={styles.textInput}
        />
        <Text style={styles.errorText}>{SlideError}</Text>
      </View>

      <View style={styles.inputWrapper}>
        <Button style={{width: 100, backgroundColor: '#F6995C'}} onPress={selectImage}>Chọn ảnh</Button>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        ) : null}
      </View>

      <View>
        <Button
          style={{
            backgroundColor: COLORS.pink,
            width: 200,
            height: 50,
            marginLeft: 80,
            justifyContent: 'center'
          }}
          contentStyle={{height: 40}}
          labelStyle={{fontSize: 16, color: 'white'}}
          onPress={AddSlide}>
          Thêm ảnh bìa
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddSlides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: COLORS.pink,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
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
  errorText: {
    color: 'red',
    marginLeft: 10,
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
});
