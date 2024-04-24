import {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const Getproduct = () => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [readiness, setReadness] = useState('');
  const [alliedPdt, setAlliedpdt] = useState('');
  let item = [
    {label: 'Item1', value: 'Item1'},
    {label: 'Item2', value: 'Item2'},
    {label: 'Item3', value: 'Item3'},
  ];
  return (
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
            // placeholder=""
          ></TextInput>
        </View>

        <View style={{padding: 8}}>
          <Text>Contact</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            onChange={newText => setContact(newText)}
            // placeholder="Contact"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Catagory</Text>
          <Dropdown
            style={styles.inputbox}
            labelField="label"
            valueField="value"
            // style={{paddingHorizontal: 10}}
            search={true}
            data={item}
            // placeholder="Catagory"
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
            // style={{padding: 10}}
            onChange={newText => setQuantity(newText)}
            // placeholder="Quantity"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Price</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            // style={{padding: 10}}
            onChange={newText => setPrice(newText)}
            // placeholder="Price"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Readness time</Text>
          <TextInput
            style={styles.inputbox}
            inputMode="numeric"
            // style={{padding: 10}}
            onChange={newText => setReadness(newText)}
            // placeholder="Readness time"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Allied Product</Text>
          <TextInput
            style={styles.inputbox}
            onChange={value => setAlliedpdt(value)}
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
    margin: 20,
    borderRadius: 10,
    padding: 15,
  },
});
export default Getproduct;
