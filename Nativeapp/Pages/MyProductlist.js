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
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ref, set, getDatabase, get, child} from 'firebase/database';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const MyProductlist = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [showRealApp, setShowRealApp] = useState(true);
  const [getGST, setGetGST] = useState(false);
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
  const slides = [
    {
      key: 1,
      title: 'Enter your products details to list in Markopolo',
      image: require('./image/ecom-store.png'),
      backgroundColor: '#2775f2',
    },
    {
      key: 2,
      title:
        'Markopolo assigns you a dedicated marketing person for your product',
      image: require('./image/ecom-marketing.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title:
        'Markopolo promotes your product and get bulk orders on free of cost',
      image: require('./image/ecom-delivary.png'),
      backgroundColor: '#22bcb5',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}
      >
        <Image
          source={item.image}
          style={{objectFit: 'contain', height: 320}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', margin: 20}}>
          {item.title}
        </Text>
      </View>
    );
  };
  return showRealApp ? (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={() => {
        setShowRealApp(false);
        setGetGST(true);
      }}
    />
  ) : getGST ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Enter your Gst number</Text>
      <TextInput
        // value={value}
        placeholder="Enter your GST"
        //   style={styles.inputText}
        onChangeText={text => setValue(text)}
      ></TextInput>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          height: 30,
          width: 60,
          backgroundColor: 'gray',
          justifyContent: 'center',
          borderRadius: 3,
        }}
        onPress={() => setGetGST(false)}
      >
        <Text style={{alignItems: 'center'}}>Verify</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{position: 'relative', flex: 1}}>
      <TouchableOpacity
        style={styles.floatingbtn}
        onPress={() => navigation.navigate('Getproduct')}
      >
        <Icon name="cash-outline" size={30} color="green" />
      </TouchableOpacity>
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
                    ></TouchableOpacity>
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
const styles = StyleSheet.create({
  floatingbtn: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    padding: 10,
    borderRadius: 130,
    backgroundColor: 'gray',
    zIndex: 999,
  },
});
export default MyProductlist;
