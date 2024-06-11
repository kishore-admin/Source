import {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ref, set, getDatabase, get, child} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import uuid from 'react-native-uuid';
import items from '../JSON/Category.json';
import ImagePicker from 'react-native-image-crop-picker';

const Getproduct = ({navigation}) => {
  const [image, setImage] = useState('');
  // const [company, setCompany] = useState('');
  // const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [wholesaleQty, setWholesaleQty] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [wholesaleReadiness, setWholesaleReadiness] = useState('');
  const [retailQty, setRetailQty] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [retailReadiness, setRetailReadiness] = useState('');
  const [alliedPdt, setAlliedpdt] = useState('');

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
    async function Usercheck() {
      let userId = await AsyncStorage.getItem('userId');
      if (userId !== undefined && userId !== null) {
        app = initializeApp(firebaseConfig);
      } else {
        console.log('no user id found');
        navigation.navigate('Login');
      }
    }
    Usercheck();
  });
  async function handleAddItem() {
    let uniqueId = uuid.v4();
    let db = getDatabase(app);
    console.log(typeof company);
    console.log(company);
    set(ref(db, 'products/' + uniqueId), {
      // company: company,
      // contact: contact,
      category: category,
      name: productName,
      description: description,
      wholesaleQty: wholesaleQty,
      wholesalePrice: wholesalePrice,
      wholesaleReadiness: wholesaleReadiness,
      retailQty: retailQty,
      retailPrice: retailPrice,
      retailReadiness: retailReadiness,
      alliedPdt: alliedPdt,
      image: image,
    });
    const userid = await AsyncStorage.getItem('userId');
    const dbRef = ref(getDatabase(app));
    console.log(userid);
    get(child(dbRef, `users/${userid}/userProduct`))
      .then(snapshot => {
        if (snapshot.exists()) {
          let array = snapshot.val();
          array.push(uniqueId);
          set(ref(db, 'users/' + userid + '/userProduct'), array);
        } else {
          console.log('No data available');
          set(ref(db, 'users/' + userid + '/userProduct'), [uniqueId]);
        }
      })
      .catch(error => {
        console.error(error);
      });
    // setCompany('');
    // setContact('');
    setCategory('');
    setProductName('');
    setDescription('');
    setWholesaleQty('');
    setWholesalePrice('');
    setWholesaleReadiness('');
    setRetailQty('');
    setRetailPrice('');
    setRetailReadiness('');
    setAlliedpdt('');
    setImage('');
  }
  function fnlGetImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImage(image.data);
    });
  }
  return (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', marginVertical: 40}}>
        <Text style={{fontSize: 20, alignSelf: 'center'}}>
          Enter your product details
        </Text>
        <View style={styles.Getproduct}>
          <View style={{padding: 8}}>
            <Text>Product Name</Text>
            <TextInput
              style={styles.inputbox}
              value={productName}
              onChangeText={newText => setProductName(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Product Description</Text>
            <TextInput
              style={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 3,
                // height: 35,
                padding: 5,
              }}
              value={description}
              multiline={true}
              onChangeText={newText => setDescription(newText)}
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
            <Text>Retail Quantity</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={retailQty}
              onChangeText={newText => setRetailQty(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Retail Price</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={retailPrice}
              onChangeText={newText => setRetailPrice(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Retail Readness time</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={retailReadiness}
              onChangeText={newText => setRetailReadiness(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Wholesale Quantity</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={wholesaleQty}
              onChangeText={newText => setWholesaleQty(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Wholesale Price</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={wholesalePrice}
              onChangeText={newText => setWholesalePrice(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Wholesale Readness time</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={wholesaleReadiness}
              onChangeText={newText => setWholesaleReadiness(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Allied Product</Text>
            <TextInput
              style={styles.inputbox}
              value={alliedPdt}
              onChangeText={value => setAlliedpdt(value)}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              height: 40,
              backgroundColor: 'gray',
              justifyContent: 'center',
              borderRadius: 3,
              width: 80,
            }}
            onPress={fnlGetImage}
          >
            <Text style={{alignItems: 'center'}}>image</Text>
          </TouchableOpacity>
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
            onPress={handleAddItem}
          >
            <Text style={{alignItems: 'center'}}>Add to Markpolo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
  },
});
export default Getproduct;