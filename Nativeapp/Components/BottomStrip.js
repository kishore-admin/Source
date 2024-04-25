import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const BottomStrip = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}
      >
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={25} color="#ffffff" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Product')}
        >
          <Icon name="logo-dropbox" size={25} color="#ffffff" />
          <Text>Manufacture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Icon name="person-circle" size={25} color="#ffffff" />
          <Text>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Icon name="cart" size={25} color="#ffffff" />
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomStrip;
