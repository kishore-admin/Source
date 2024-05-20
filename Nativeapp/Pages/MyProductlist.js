import {useEffect, useState} from 'react';
import {database} from './Firebase/config';
import {
  Alert,
  Image,
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, set, getDatabase, get, child} from 'firebase/database';

const MyProductlist = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getproductList();
    async function getproductList() {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== undefined && userId !== null) {
        get(child(ref(database), `users/${userId}/userProduct`))
          .then(async snapshot => {
            if (snapshot.exists()) {
              products = snapshot.val();
              let array = [];
              for (let i = 0; i < products.length; i++) {
                await get(child(ref(database), `products/` + products[i])).then(
                  snapshot => {
                    let data = snapshot.val();
                    if (data !== null) {
                      array.push(data);
                    }
                  },
                );
              }
              console.log(array);
              setProductList(array);
            } else {
              Alert.alert('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }, []);
  return (
    <ScrollView>
      <View style={{flex: 1, margin: 20}}>
        <Text style={{fontSize: 20, fontWeight: 600}}>Products</Text>
        <FlatList
          style={{flex: 1, height: '100%'}}
          data={productList}
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
                  style={{objectFit: 'contain', width: 100, height: 120}}
                  source={{
                    uri: 'data:image/png;base64,' + item.image,
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
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
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
export default MyProductlist;
