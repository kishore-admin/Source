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
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cnpassword, setCnPassword] = useState('');
  async function fnSignUp() {
    if (password === cnpassword) {
      let data = {email: email, password: password, returnSecureToken: true};
      await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI',
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        },
      )
        .then(response => {
          let data = JSON.stringify(response);
          console.log(data);
          // Alert.alert(data); // JSON data parsed by `data.json()` cal)l
          if (response.status == '200') {
            Alert.alert('Account created sucessfully');
          } else if (response.status == '400') {
            //   if (data.message === 'EMAIL_EXISTS')
            //     Alert.alert('Email Already exsists');
            // } else {
            Alert.alert('Account creation failed');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('Password Mismatch');
    }
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
          value={username}
          placeholder="Username"
          style={styles.inputText}
          onChangeText={text => setUsername(text)}
        ></TextInput>
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
