import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import COLOR from '../constants';
import {ScrollView} from 'react-native-gesture-handler';

const container = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Món chính',
      image: require('../assets/Image/Food1.jpg'),
      price: 10000,
    },
    {
      id: 2,
      name: 'Món phụ',
      image: require('../assets/Image/Food1.jpg'),
      price: 10000,
    },
    {
      id: 3,
      name: 'Tráng miệng',
      image: require('../assets/Image/Food1.jpg'),
      price: 10000,
    },
  ]);
  const handleCategoryPress = categoryId => {
    // Xử lý điều hướng hoặc thực hiện các hành động khác khi chọn danh mục
    console.log('Selected category:', categoryId);
  };
  const formatPriceToVND = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  // Mục danh mục món ăn trong FlatList
  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}>
      <Image
        source={item.image}
        style={styles.categoryImage}
        resizeMode="cover" // Đảm bảo hình ảnh không vượt quá kích thước
      />
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryPrice}>
        {formatPriceToVND(parseFloat(item.price))}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.categoryList}
      />
      <Text style={{color: COLOR.white, fontSize: 30, padding: 20}}>
        Món ăn ----------
      </Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
};

export default container;
const styles = StyleSheet.create({
    categoryList: {
        height: 250,
        paddingHorizontal: 16, 
        paddingVertical: 20,
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
        overflow: "hidden",
      },
    });
  