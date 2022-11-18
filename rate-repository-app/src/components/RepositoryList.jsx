import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const OrderPicker = ({selectedOrder, setSelectedOrder}) => {
  return(
    <Picker
    selectedValue={selectedOrder}
    onValueChange={(itemValue, itemIndex) =>
      setSelectedOrder(itemValue)
    }>
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="highest" />
    <Picker.Item label="Lowest rated repositories" value="lowest" />
  </Picker>
  )
}

const SearchBar = ({searchQuery, setSearchQuery}) => {
  const onChangeSearch = query => setSearchQuery(query);
  return(
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  )
}

const ListHeader = ({selectedOrder, setSelectedOrder, searchQuery, setSearchQuery}) => {
  return(
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <OrderPicker selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>
    </>
  )
}


const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("highest");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText] = useDebounce(searchQuery, 500)
  const { repositories } = useRepositories(selectedOrder, searchText);

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];


  return (
    <>
      <FlatList
        ListHeaderComponent={<ListHeader selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item}/> }
        keyExtractor={(item, index) => 'key'+index}
        // other props
      />
    </>
  );
};


export default RepositoryList;