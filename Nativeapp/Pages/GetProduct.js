import {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AppIntroSlider from 'react-native-app-intro-slider';
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
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [readiness, setReadness] = useState('');
  const [alliedPdt, setAlliedpdt] = useState('');
  const [showRealApp, setShowRealApp] = useState(false);
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
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>
        Fill the details below
      </Text>
      <View style={styles.Getproduct}>
        <View style={{padding: 8}}>
          <Text>Company Name</Text>
          <TextInput
            style={styles.inputbox}
            onChange={value => setCompany(value)}
          ></TextInput>
        </View>

        <View style={{padding: 8}}>
          <Text>Contact</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            onChange={newText => setContact(newText)}
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
              setCategory(data);
            }}
          ></Dropdown>
        </View>
        <View style={{padding: 8}}>
          <Text>Quantity</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            onChange={newText => setQuantity(newText)}
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Price</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            onChange={newText => setPrice(newText)}
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Readness time</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            onChange={newText => setReadness(newText)}
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Allied Product</Text>
          <TextInput
            style={styles.inputbox}
            onChange={value => setAlliedpdt(value)}
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
        >
          <Text style={{alignItems: 'center'}}>Add to Markpolo</Text>
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
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
  },
});
export default Getproduct;
