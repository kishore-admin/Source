import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Product from './Product.json';
import {useState} from 'react';
const Home = () => {
  const [filterData, setFilteredData] = useState('');
  const [Data, setData] = useState(Product);
  function fnlFilter() {
    // this.setState({searchText: searchText});
    // console.log(e);
    // alert('hi');
    // alert('1' + JSON.stringify(filterData));
    let filteredData = Data.filter(function (item) {
      return item.category.includes(filterData);
    });
    // alert(filteredData);
    setData(filteredData);
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity style={{backgroundColor: 'green', height: 50}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Toolbar</Text>
            <Text>Profile</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={{borderWidth: 1, borderStyle: 'solid'}}
          onChange={newText => setFilteredData(newText)}
        ></TextInput>
        <TouchableOpacity
          onPress={fnlFilter}
          //   style={{backgroundColor: 'yellow'}}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
        <FlatList
          // style
          numColumns={2}
          data={Data}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card}>
              <Image style={styles.thumb} source={{uri: item.image}} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.price}>$ {item.price}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 3,
                      paddingVertical: 2,
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text style={{fontSize: 12, color: '#fff'}}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          //   keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    objectFit: 'contain',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Home;
