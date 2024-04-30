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
import {ref, set, Database, getDatabase, get} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import uuid from 'react-native-uuid';

const slides = [
  {
    key: 1,
    // title: 'Title 1',
    title: 'Enter your products details to list in Markopolo',
    image: require('./image/ecom-store.png'),
    backgroundColor: '#2775f2',
  },
  {
    key: 2,
    // title: 'Title 2',
    title:
      'Markopolo assigns you a dedicated marketing person for your product',
    image: require('./image/ecom-marketing.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    // title: 'Rocket guy',
    title:
      'Markopolo promotes your product and get bulk orders on free of cost',
    image: require('./image/ecom-delivary.png'),
    backgroundColor: '#22bcb5',
  },
];

const Getproduct = () => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [wholesaleQty, setWholesaleQty] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [wholesaleReadiness, setWholesaleReadiness] = useState('');
  const [retailQty, setRetailQty] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [retailReadiness, setRetailReadiness] = useState('');
  const [alliedPdt, setAlliedpdt] = useState('');
  const [showRealApp, setShowRealApp] = useState(false);

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
    app = initializeApp(firebaseConfig);
  });
  async function handleAddItem() {
    let uniqueId = uuid.v4();
    let db = getDatabase(app);
    console.log(typeof company);
    console.log(company);
    set(ref(db, 'products/' + uniqueId), {
      company: company,
      contact: contact,
      category: category,
      wholesaleQty: wholesaleQty,
      wholesalePrice: wholesalePrice,
      wholesaleReadiness: wholesaleReadiness,
      retailQty: retailQty,
      retailPrice: retailPrice,
      retailReadiness: retailReadiness,
      alliedPdt: alliedPdt,
    });
    const userid = await AsyncStorage.getItem('userId');
    console.log(userid);
    let collection = get(ref(db, 'users/' + userid + '/productCollection'));
    console.log(collection);
    set(ref(db, 'users/' + userid + '/productCollection')[1], [uniqueId]);
    setCompany('');
    setContact('');
    setCategory('');
    setWholesaleQty('');
    setWholesalePrice('');
    setWholesaleReadiness('');
    setRetailQty('');
    setRetailPrice('');
    setRetailReadiness('');
    setAlliedpdt('');
  }
  let item = [
    {label: 'Item1', value: 'Item1'},
    {label: 'Item2', value: 'Item2'},
    {label: 'Item3', value: 'Item3'},
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
        {/* <Text style={{fontSize: 17}}>{item.text}</Text> */}
      </View>
    );
  };
  return showRealApp ? (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={() => setShowRealApp(false)}
    />
  ) : (
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', marginVertical: 40}}>
        <Text style={{fontSize: 20, alignSelf: 'center'}}>
          Fill the details below
        </Text>
        <View style={styles.Getproduct}>
          <View style={{padding: 8}}>
            <Text>Company Name</Text>
            <TextInput
              style={styles.inputbox}
              value={company}
              onChangeText={newText => setCompany(newText)}
            ></TextInput>
          </View>

          <View style={{padding: 8}}>
            <Text>Contact</Text>
            <TextInput
              style={styles.inputbox}
              inputMode="numeric"
              value={contact}
              onChangeText={newText => setContact(newText)}
            ></TextInput>
          </View>
          <View style={{padding: 8}}>
            <Text>Catagory</Text>
            <Dropdown
              style={styles.inputbox}
              labelField="label"
              valueField="value"
              search={true}
              data={item}
              placeholderStyle={{fontSize: 15, color: 'black'}}
              value={category}
              onChange={data => {
                setCategory(data.value);
              }}
            ></Dropdown>
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
            <Text>Allied Product</Text>
            <TextInput
              style={styles.inputbox}
              value={alliedPdt}
              onChangeText={value => setAlliedpdt(value)}
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
