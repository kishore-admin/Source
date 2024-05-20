import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from './JSON/Product.json';
// import Carousel from 'react-native-reanimated-carousel';
import {ref, set, getDatabase, get, child} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import Category from './JSON/Category.json';

const Home = ({navigation}) => {
  let products;
  const [filterData, setFilteredData] = useState('');
  const [Data, setData] = useState(Product);
  const [productList, setProductList] = useState('');
  const [refresh, setRefresh] = useState(false);
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
    async function UserId() {
      let userId = await AsyncStorage.getItem('userId');
      if (userId !== undefined && userId !== null) {
        get(child(dbRef, `products`))
          .then(snapshot => {
            if (snapshot.exists()) {
              products = snapshot.val();
              setProductList(products);
              console.log(products);
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          });
        setRefresh(false);
      } else {
        console.log('no user id found');
        navigation.navigate('Login');
      }
    }
    UserId();
  }, [refresh]);
  async function fnlcart(item) {
    const userid = await AsyncStorage.getItem('userId');
    get(child(dbRef, `users/${userid}/cartItems`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let array = snapshot.val();
          let items = array.includes(item);
          if (!items) {
            array.push(item);
            set(ref(db, 'users/' + userid + '/cartItems'), array);
          }
        } else {
          console.log('No data available');
          set(ref(db, 'users/' + userid + '/cartItems'), [item]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const width = Dimensions.get('window').width;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }
    >
      <SafeAreaView style={{padding: 10}}>
        <View>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <Image
              style={{height: 40, width: 30}}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VXmgKBoAvy1AqjLWAIQ8xYn9pNZWsGkDGYZq2ufDlQ&s',
              }}
            ></Image>
            <Text>A free marketing app for manufactures</Text>
            {/* <Icon
              name="cart"
              size={30}
              color="green"
              onPress={() => navigation.navigate('Cart')}
            /> */}
          </View>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              style={styles.inputText}
              value={filterData}
              onFocus={() => navigation.navigate('SearchProduct')}
              onChangeText={newText => setFilteredData(newText)}
              placeholder="Search"
            ></TextInput>
            <Icon
              style={{position: 'absolute', left: '91%', top: 14}}
              name="search"
              size={20}
              color="gray"
            />
            {/* <Icon
              name="cash-outline"
              size={30}
              color="green"
              // onPress={() => navigation.navigate('IntroSlider')}
            /> */}
          </View>
          <Text style={styles.subHeading}>Category</Text>
          <FlatList
            style={{height: 95}}
            horizontal={true}
            data={Category}
            renderItem={({item}) => (
              <View
                style={{
                  padding: 10,
                  height: 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductCategory', {
                      category: item.value,
                    });
                  }}
                >
                  <Image
                    style={styles.horizontalThumb}
                    source={{uri: 'data:image/png;base64,' + item.image}}
                  />
                  <Text style={styles.horizontalName}>{item.value}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.subHeading}>Special offers</Text>
          {/* <Carousel
            style={{alignItems: 'center'}}
            loop
            pagingEnabled={false}
            snapEnabled={false}
            width={width}
            height={80}
            autoPlay={true}
            data={Data}
            scrollAnimationDuration={4000}
            renderItem={({item}) => (
              <View>
                <Image style={styles.carouselImg} source={{uri: item.image}} />
              </View>
            )}
          /> */}
          <Text style={styles.subHeading}>Products</Text>
          <FlatList
            style={{height: '100%', marginTop: 10}}
            numColumns={2}
            data={Object.keys(productList)}
            refreshing={true}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={1} style={styles.card}>
                <Image
                  style={styles.thumb}
                  source={{
                    uri: 'data:image/png;base64,' + productList[item].image,
                  }}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{productList[item].name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 5,
                    }}
                  >
                    <Text style={styles.price}>
                      $ {productList[item].retailPrice}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'green',
                        borderRadius: 3,
                        paddingVertical: 2,
                        paddingHorizontal: 15,
                      }}
                      onPress={() => fnlcart(item)}
                    >
                      <Text style={{fontSize: 12, color: '#fff'}}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
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
    // paddingHorizontal: 5,
  },
  thumb: {
    // marginVertical: 12,
    // objectFit: 'contain',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: 155,
  },
  carouselImg: {
    objectFit: 'contain',
    height: 70,
  },
  horizontalThumb: {
    objectFit: 'contain',
    height: 40,
    width: 60,
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
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
  horizontalName: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputText: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 35,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  subHeading: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
    marginLeft: 5,
    marginBottom: 5,
  },
});
export default Home;
