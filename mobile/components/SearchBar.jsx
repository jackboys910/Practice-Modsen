import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native'

import { Picker } from '@react-native-picker/picker'

const { width } = Dimensions.get('window')

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('relevance')

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'art', label: 'Art' },
    { value: 'biography', label: 'Biography' },
    { value: 'computers', label: 'Computers' },
    { value: 'history', label: 'History' },
    { value: 'medical', label: 'Medical' },
    { value: 'poetry', label: 'Poetry' },
  ]

  const sorts = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
  ]

  const handleSearch = () => {
    onSearch({ query: query || 'all', category, sort })
  }

  return (
    <ImageBackground
      source={require('../assets/photoBackground.jpg')}
      style={styles.background}
    >
      <Text style={styles.heading}>Search for books</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickerRow}>
        <Text style={styles.label}>Categories</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Picker>
        <Text style={styles.label}>Sorting by</Text>
        <Picker
          selectedValue={sort}
          style={styles.picker}
          onValueChange={(itemValue) => setSort(itemValue)}
        >
          {sorts.map((s) => (
            <Picker.Item key={s.value} label={s.label} value={s.value} />
          ))}
        </Picker>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    width: 400,
    height: 350,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 40,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerRow: {
    marginTop: 0,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
    height: 55,
  },
})

export default SearchBar
