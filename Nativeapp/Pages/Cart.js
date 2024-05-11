import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, set, getDatabase, get, child} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import {useEffect, useState} from 'react';

const Cart = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let products;
  const json = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  };
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
  let app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase(app));
  const db = getDatabase(app);
  useEffect(() => {
    UserId();
    async function UserId() {
      let userid = await AsyncStorage.getItem('userId');
      if (userid !== undefined && userid !== null) {
        app = initializeApp(firebaseConfig);
        get(child(dbRef, `users/${userid}/cartItems`))
          .then(async snapshot => {
            if (snapshot.exists()) {
              products = snapshot.val();
              let array = [];
              for (let i = 0; i < products.length; i++) {
                await get(child(dbRef, `products/` + products[i])).then(
                  snapshot => {
                    let data = snapshot.val();
                    if (data !== null) {
                      array.push(data);
                    }
                  },
                );
              }
              console.log(array);
              setCart(array);
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.log('no user id found');
        navigation.navigate('Login');
      }
    }
    setRefresh(false);
  }, [refresh]);
  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={{fontSize: 20}}>My Cart</Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }
      >
        <View style={{flex: 1, marginTop: 50}}>
          <FlatList
            style={{flex: 1, height: '100%'}}
            data={cart}
            // refreshing={true}
            renderItem={({item}) => (
              <View
                style={{
                  padding: 10,
                  borderRadius: 4,
                  flexDirection: 'row',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  gap: 25,
                  marginBottom: 10,
                  // flex: 1,
                }}
              >
                <View style={{}}>
                  <Image
                    style={{
                      objectFit: 'contain',
                      width: 100,
                      height: 120,
                    }}
                    source={{
                      uri:
                        'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
                    }}
                  ></Image>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.name}</Text>
                  <View
                    style={{
                      width: 62,
                      flexDirection: 'row',
                      marginTop: 5,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderRadius: 4,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 20,
                        alignItems: 'center',
                        //   padding: 5,
                      }}
                    >
                      <Text style={{fontSize: 15, textAlign: 'center'}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 20,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{fontSize: 15, textAlign: 'center'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      marginTop: 5,
                    }}
                  >
                    <Text>Qty :</Text>
                    <Text>1</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        verticalAlign: 'middle',
                        color: 'green',
                        fontWeight: '500',
                      }}
                    >
                      Rs.{item.retailPrice}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        alignItems: 'center',
                        height: 30,
                        backgroundColor: 'gray',
                        justifyContent: 'center',
                        borderRadius: 3,
                      }}
                      //   onPress={fnlSubmit}
                    >
                      <Text
                        style={{
                          alignItems: 'center',
                          fontSize: 12,
                          paddingHorizontal: 10,
                        }}
                      >
                        Buy now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Cart;
