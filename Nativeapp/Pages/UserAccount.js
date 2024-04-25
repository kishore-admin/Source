import {Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserAccount = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#dcdcde', padding: 20}}>
      <Icon
        name="person-circle"
        size={95}
        color="#ffffff"
        style={{
          alignSelf: 'center',
          marginBottom: 15,
        }}
      />
      <Text style={styles.subHeading}>Personal Details</Text>
      <View
        style={{
          flex: 0.7,
          borderRadius: 5,
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 8,
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Name</Text>
          <TextInput placeholder="Your Name" style={{width: 200}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Contact</Text>
          <TextInput
            placeholder="Contact Number"
            style={{width: 200}}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Email Id</Text>
          <TextInput placeholder="Your Number" style={{width: 200}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Address</Text>
          <TextInput
            placeholder="Your Address"
            multiline={true}
            style={{width: 200}}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>City</Text>
          <TextInput placeholder="City" style={{width: 200}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Postal code</Text>
          <TextInput placeholder="Postal code" style={{width: 200}}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{paddingHorizontal: 15}}>Country</Text>
          <TextInput placeholder="Country" style={{width: 200}}></TextInput>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  subHeading: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
    marginLeft: 5,
    marginBottom: 5,
  },
});
export default UserAccount;
