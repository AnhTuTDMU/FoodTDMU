import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLOR from '../constants'
const SearchInput = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên searchText
    console.log('Searching for:', searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Icon name="search" size={18} color={COLOR.blue_black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F5F2',
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  button: {

    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
});

export default SearchInput;
