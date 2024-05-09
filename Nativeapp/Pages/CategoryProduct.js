import {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {database} from './Firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, set, get, child} from 'firebase/database';

const ProductCategory = ({route, navigation}) => {
  const {category} = route.params;
  const [data, setData] = useState([]);
  useEffect(() => {
    async function productList() {
      let userId = await AsyncStorage.getItem('userId');
      if (userId !== undefined && userId !== null) {
        let list = [];
        get(child(ref(database), `products`))
          .then(snapshot => {
            if (snapshot.exists()) {
              products = snapshot.val();
              let keys = Object.keys(products);
              for (let i = 0; i < keys.length; i++) {
                if (products[keys[i]].category === category) {
                  products[keys[i]].id = keys[i];
                  //   console.log(products[keys[i]].id);
                  list.push(products[keys[i]]);
                }
              }
              setData(list);
              console.log(data);
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
    productList();
  }, []);

  async function fnlcart(id) {
    const userid = await AsyncStorage.getItem('userId');
    get(child(ref(database), `users/${userid}/cartItems`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let array = snapshot.val();
          let items = array.includes(id);
          if (!items) {
            array.push(id);
            set(ref(database, 'users/' + userid + '/cartItems'), array);
          }
        } else {
          console.log('No data available');
          set(ref(database, 'users/' + userid + '/cartItems'), [id]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={{fontSize: 20}}>{category}</Text>
      <FlatList
        style={{height: '100%', marginTop: 10}}
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={1} style={styles.card}>
            <Image
              style={styles.thumb}
              source={{
                uri: 'data:image/png;base64,' + item.image,
              }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
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
                  onPress={() => fnlcart(item.id)}
                >
                  <Text style={{fontSize: 12, color: '#fff'}}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
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
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: 151,
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default ProductCategory;
