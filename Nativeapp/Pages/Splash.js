import {Image, View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  useEffect(() => {
    async function fnGetuser() {
      const UserEmail = await AsyncStorage.getItem('email');
      const Password = await AsyncStorage.getItem('password');
      if (
        UserEmail !== undefined &&
        UserEmail !== null &&
        Password !== undefined &&
        Password !== null
      ) {
        auth()
          .signInWithEmailAndPassword(UserEmail, Password)
          .then(async response => {
            console.log(response);
            if (response.user.emailVerified) {
              console.log(response);
              // navigation.navigate('BottomStrip');
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
    }
    fnGetuser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VXmgKBoAvy1AqjLWAIQ8xYn9pNZWsGkDGYZq2ufDlQ&s',
          }}
          style={{width: 110, height: 110}}
        ></Image>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerimg: {
    width: 100,
    objectFit: 'contain',
    marginBottom: 12,
  },
});
export default Splash;
