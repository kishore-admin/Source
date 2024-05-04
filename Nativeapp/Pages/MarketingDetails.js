import {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ref, set, getDatabase, get, child} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import items from './JSON/Category.json';

const MktDetails = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
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
      } else {
        console.log('no user id found');
        navigation.navigate('Login');
      }
    }
    UserId();
  });
  function fnInfo() {
    Alert.alert('Earn for every sale we get through your referal');
  }
  async function fnlSubmit() {
    let uniqueId = uuid.v4();
    let code = makeid(6);
    console.log(code);
    let db = getDatabase(app);
    set(ref(db, 'marketers/' + uniqueId), {
      name: name,
      contact: contact,
      email: email,
      address: address,
      product: product,
      referalCode: code,
    });
    const userid = await AsyncStorage.getItem('userId');
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `users/${userid}/referals`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let array = snapshot.val();
          array.push(uniqueId);
          set(ref(db, 'users/' + userid + '/referals'), array);
        } else {
          console.log('No data available');
          set(ref(db, 'users/' + userid + '/referals'), [uniqueId]);
        }
      })
      .catch(error => {
        console.error(error);
      });
    setName('');
    setContact('');
    setEmail('');
    setAddress('');
    setProduct('');
    setCategory('');
  }
  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'flex-end',
          marginEnd: 10,
        }}
      >
        {/* <Icon
          name="information-circle"
          size={20}
          color="#0fa4f5"
          onPress={fnInfo}
        /> */}
      </View>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>Refer and Earn</Text>
      <View style={styles.Getproduct}>
        <View style={{padding: 8}}>
          <Text>Marketer's Name</Text>
          <TextInput
            style={styles.inputbox}
            value={name}
            onChangeText={value => setName(value)}
            // placeholder=""
          ></TextInput>
        </View>

        <View style={{padding: 8}}>
          <Text>Contact</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            value={contact}
            onChangeText={newText => setContact(newText)}
            // placeholder="Contact"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Email Id</Text>
          <TextInput
            style={styles.inputbox}
            value={email}
            onChangeText={newText => setEmail(newText)}
            // placeholder="Quantity"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Address</Text>
          <TextInput
            style={styles.inputbox}
            value={address}
            multiline={true}
            onChangeText={newText => setAddress(newText)}
            // placeholder="Price"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Catagory</Text>
          <Dropdown
            style={styles.inputbox}
            labelField="label"
            valueField="value"
            search={true}
            data={items}
            placeholderStyle={{fontSize: 15, color: 'black'}}
            value={category}
            onChange={data => {
              setCategory(data.value);
            }}
          ></Dropdown>
        </View>
        <View style={{padding: 8}}>
          <Text>Product</Text>
          <TextInput
            style={styles.inputbox}
            value={product}
            onChangeText={value => setProduct(value)}
            // placeholder="Allied Product"
          ></TextInput>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: 40,
            backgroundColor: 'gray',
            justifyContent: 'center',
            borderRadius: 3,
          }}
          onPress={fnlSubmit}
        >
          <Text style={{alignItems: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputbox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    height: 35,
    padding: 5,
  },
  Getproduct: {
    shadowColor: 'red',
    shadowOffset: {width: 12, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: '#edebeb',
    margin: 20,
    borderRadius: 10,
    padding: 15,
  },
});
export default MktDetails;
