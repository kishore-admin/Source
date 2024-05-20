import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const UserAccount = ({navigation}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column', margin: 20}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserAccount')}
      >
        <Text>Persoanl details</Text>
        <Icon name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Getproduct')}
      >
        <Text>My Product</Text>
        <Icon name="home" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Referals</Text>
        <Icon name="home" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>My Product</Text>
        <Icon name="home" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
});
export default UserAccount;
