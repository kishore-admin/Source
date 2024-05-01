import {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Icon,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ref, getDatabase, get, child} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchProduct = ({navigation}) => {
  let Data;
  const [search, setSearch] = useState('');
  const [emptyPage, setEmptyPage] = useState(true);
  const [productList, setProductList] = useState('');
  const [products, setProducts] = useState('');
  const firebaseConfig = {
    apiKey: 'AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI',
    authDomain: 'ecom-project-cef50.firebaseapp.com',
    databaseURL:
      'https://ecom-project-cef50-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'ecom-project-cef50',
    storageBucket: 'ecom-project-cef50.appspot.com',
    messagingSenderId: '58239290286',
    appId: '1:58239290286:web:630328351dc0482cc2163f',
    measurementId: 'G-84P32S9TGG',
  };
  let app;
  useEffect(() => {
    async function UserId() {
      let userId = await AsyncStorage.getItem('userId');
      if (userId !== undefined && userId !== null) {
        app = initializeApp(firebaseConfig);
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, `products`))
          .then(snapshot => {
            if (snapshot.exists()) {
              Data = snapshot.val();
              setProductList(Data);
              console.log(Data);
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error('error');
            console.error(error);
          });
      } else {
        console.log('no user id found');
        navigation.navigate('Login');
      }
    }
    UserId();
  }, []);
  function fnlFilter() {
    console.log(products);
    let SearchData = Object.values(productList).filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setProducts(SearchData);
    setEmptyPage(false);
    console.log(SearchData);
  }
  return (
    <View style={{padding: 10, flex: 1, justifyContent: 'center'}}>
      <TextInput
        style={styles.inputText}
        onChangeText={newText => setSearch(newText)}
        value={search}
        placeholder="Search"
      ></TextInput>
      <TouchableOpacity onPress={() => fnlFilter()}>
        <Text>Click Me</Text>
      </TouchableOpacity>
      {/* <Icon
        style={{position: 'absolute', left: '91%', top: 14}}
        name="search"
        size={20}
        color="gray"
        onPress={() => fnlFilter()}
      /> */}
      {!emptyPage ? (
        <FlatList
          style={{height: '100%', marginTop: 10}}
          numColumns={2}
          data={products}
          refreshing={true}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card}>
              <Image
                style={styles.thumb}
                source={{
                  uri:
                    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
                }}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                  style={styles.description}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 5,
                  }}
                >
                  <Text style={styles.price}>$ {item.retailPrice}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 3,
                      paddingVertical: 2,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text style={{fontSize: 12, color: '#fff'}}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 15}}>Search your product here</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    marginBottom: 10,
    flexDirection: 'column',
    width: '46%',
    height: 220,
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
  },
  thumb: {
    marginVertical: 12,
    objectFit: 'contain',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingBottom: 15,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    width: 135,
  },
  inputText: {
    width: '95%',
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 35,
    paddingVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default SearchProduct;
