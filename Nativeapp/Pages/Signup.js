import {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {auth, database} from './Firebase/config';
import {ref, set} from 'firebase/database';
import uuid from 'react-native-uuid';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cnpassword, setCnPassword] = useState('');
  async function fnSignUp() {
    if (password === cnpassword) {
      let code = makeid(6);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async userCred => {
          const user = userCred.user;
          console.log(code);
          set(ref(database, 'users/' + user.uid), {
            email: email,
            referalCode: code,
          });
          await sendEmailVerification(user);
          Alert.alert('Verify your email address');
          setEmail('');
          setPassword('');
          setCnPassword('');
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          console.log(error);
        });
    } else {
      Alert.alert('Password Mismatch');
    }
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
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VXmgKBoAvy1AqjLWAIQ8xYn9pNZWsGkDGYZq2ufDlQ&s',
            }}
          ></Image>
        </View>
        <Text>Enter your email</Text>
        <TextInput
          value={email}
          placeholder="Enter your email"
          style={styles.inputText}
          onChangeText={text => setEmail(text)}
        ></TextInput>
        <Text style={{marginTop: 10}}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.inputText}
        ></TextInput>
        <Text style={{marginTop: 10}}>Confirm Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={cnpassword}
          secureTextEntry={true}
          onChangeText={text => setCnPassword(text)}
          style={styles.inputText}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={fnSignUp}>
          <Text style={{padding: 10, textAlign: 'center'}}>
            Create your account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
  inputText: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#d6d4d4',
    borderRadius: 3,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    marginVertical: 20,
  },
});
export default SignUp;
