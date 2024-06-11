import {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {initializeApp} from 'firebase/app';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('subscriber');
    console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  });
  function onAuthStateChanged(user) {
    console.log('user');
    console.log(user);
    setUser(user);
  }
  async function fnLogin() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async response => {
        console.log(response);
        if (response.user.emailVerified) {
          await AsyncStorage.setItem('userId', response.user.uid);
          await AsyncStorage.setItem('email', response.user.email);
          await AsyncStorage.setItem('password', password);
          setEmail('');
          setPassword('');
          navigation.navigate('BottomStrip');
        } else {
          Alert.alert('Please verify your email address !!!');
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid login credentials');
        }
      });
  }
  async function fnForgetPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
        Alert.alert('Email sent');
      })
      .catch(function (error) {
        // An error happened.
        Alert.alert('Failed');
      });
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
        <Text>Username</Text>
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
        <TouchableOpacity style={styles.button} onPress={fnLogin}>
          <Text style={{padding: 10, textAlign: 'center'}}>Sign in</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Text style={{padding: 10, textAlign: 'center'}}>Google Sign in</Text>
        </TouchableOpacity> */}
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text>If you are new here, </Text>
          <Text
            style={{color: 'blue'}}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign up
          </Text>
        </View>
        <TouchableOpacity onPress={fnForgetPassword}>
          <Text>Forget password</Text>
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
export default Login;
