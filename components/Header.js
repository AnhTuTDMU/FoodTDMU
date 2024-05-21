import React, { useRef, useEffect, useState } from 'react';
import { Image, View, Dimensions, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar, Menu, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController, logout } from '../src/context'; 
import COLORS from './../constants';
import SearchInput from './SearchInput';

const Header = ({}) => {
  const ScreenWidth = Dimensions.get('window').width;
  const [slides, setSlides] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore().collection('Slide').onSnapshot(snapshot => {
      const slidesData = [];
      snapshot.forEach(doc => {
        const { imageUrl  } = doc.data();
        slidesData.push({
          id: doc.id,
          image: imageUrl 
        });
      });
      setSlides(slidesData);
    });

    return () => unsubscribe();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage < slides.length - 1) {
        setCurrentPage(currentPage + 1);
        flatListRef.current.scrollToIndex({ index: currentPage + 1 });
      } else {
        setCurrentPage(0);
        flatListRef.current.scrollToIndex({ index: 0 });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, slides]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: ScreenWidth, marginTop: 5 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: ScreenWidth, height: 200, resizeMode: 'contain', borderRadius: 20 }}
        />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return (
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentPage && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Appbar.Header style={styles.AppbarHeader} > 
        <Appbar.Content 
          title={`Xin chào ${userLogin ? userLogin.name : 'Guest'}`} 
          titleStyle={{fontSize: 18}}
          color='white' 
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="account-circle" onPress={openMenu} color="white" />}
        >
          <Menu.Item
            onPress={() => {
              console.log('Navigate to Home');
              closeMenu();
            }}
            title="Thông tin cá nhân"
          />
          <Menu.Item
            onPress={() => {
              logout(dispatch, navigation); 
              closeMenu();
            }}
            title="Đăng xuất"
          />
        </Menu>
      </Appbar.Header>
      <SearchInput />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setCurrentPage(
            Math.floor(event.nativeEvent.contentOffset.x / ScreenWidth)
          );
        }}
      />
      {renderDotIndicators()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AppbarHeader:{
    backgroundColor: COLORS.blue_black, 
    height:50 ,
  },

});

export default Header;
