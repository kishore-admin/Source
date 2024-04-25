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
const MktDetails = () => {
  function fnInfo() {
    Alert.alert('Earn for every sale we get through your referal');
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'flex-end',
          marginEnd: 10,
        }}
      >
        <Icon
          name="information-circle"
          size={20}
          color="#0fa4f5"
          onPress={fnInfo}
        />
      </View>
      <Text style={{fontSize: 20, alignSelf: 'center'}}>Refer and Earn</Text>
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
          <Text>EmailId</Text>
          <TextInput
            style={styles.inputbox}
            onChange={newText => setQuantity(newText)}
            // placeholder="Quantity"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Place</Text>
          <TextInput
            style={styles.inputbox}
            onChange={newText => setPrice(newText)}
            // placeholder="Price"
          ></TextInput>
        </View>
        <View style={{padding: 8}}>
          <Text>Product</Text>
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
