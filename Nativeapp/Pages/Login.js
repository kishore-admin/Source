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
import {ref, set, getDatabase} from 'firebase/database';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// "@react-native-google-signin/google-signin": "^11.0.1",
// "@react-native-firebase/auth": "^19.2.2",
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // GoogleSignin.configure({
  //   webClientId: '',
  // });
  useEffect(() => {
    async function login() {
      let value = await AsyncStorage.getItem('email');
      if (value !== undefined) {
        let data = {email: email, password: password, returnSecureToken: true};
        await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI',
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          },
        );
        // navigate to the
      }
    }
    login;
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  });
  async function fnLogin() {
    let data = {email: email, password: password, returnSecureToken: true};
    await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI',
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      },
    )
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        // const db = getDatabase();
        // set(ref(db, 'users/' + JSON.parse(result).localId), {
        //   email: email,
      })
      .then(() => {
        async function session() {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
        }
        session;
        Alert.alert('Done');
      })
      .catch(error => {
        console.log(error);
      });
    // })
    // .catch(error => console.error(error));
    // .then(response => {
    //   let data = JSON.stringify(response);
    //   if (response.status == '200') {
    //     Alert.alert('login success');
    //   } else if (response.status == '400') {
    //     Alert.alert('Check login details');
    //   }
    // });
  }
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      // const {idToken} = await GoogleSignin.signIn();
      // console.log('idToken' + idToken);
      // const currentUser = await GoogleSignin.getCurrentUser();
      // console.log('currentUser' + currentUser);
      // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(googleCredential);
      // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }
  // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   // if (initializing) setInitializing(false);
  // }
  // if (initializing) return null;
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
        <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Text style={{padding: 10, textAlign: 'center'}}>Google Sign in</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text>If you are new here,</Text>
          <Text style={{color: 'blue'}}> Sign up</Text>
        </View>
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
