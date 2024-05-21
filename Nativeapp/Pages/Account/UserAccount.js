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
        onPress={() => navigation.navigate('UserDetails')}
      >
        <Text>Persoanl details</Text>
        <Icon name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyProductlist')}
      >
        <Text>My Product</Text>
        <Icon name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MktDetails')}
      >
        <Text>Referals</Text>
        <Icon name="arrow-forward" size={20} color="#000" />
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
