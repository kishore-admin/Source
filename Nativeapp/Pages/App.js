import {useState, useRef, useEffect} from 'react';
import {Alert, Animated, Text, View} from 'react-native';
import BottomStrip from '../Components/BottomStrip';
import Splash from './Splash';
import IntroSlider from './IntroSlider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Authenication/Login';
import SearchProduct from './SearchProduct';
import SignUp from './Authenication/Signup';
import Cart from './Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCategory from './CategoryProduct';
import UserDetails from './Account/UserDetails';
import UserAccount from './Account/UserAccount';
import Getproduct from './Account/GetProduct';
import MyProductlist from './Account/MyProductlist';
import MktDetails from './Account/MarketingDetails';
const Stack = createNativeStackNavigator();

const App = () => {
  const [splash, setSplash] = useState(true);
  const [introslider, setIntroslider] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 2000);
  useEffect(() => {
    async function fnGetUserId() {
      const id = await AsyncStorage.getItem('userId');
      if (id !== undefined && id !== null) {
        setIntroslider(false);
      }
    }
    fnGetUserId();
  });
  return splash ? (
    <Splash></Splash>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={introslider ? 'IntroSlider' : 'BottomStrip'}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomStrip" component={BottomStrip} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        <Stack.Screen name="Getproduct" component={Getproduct} />
        <Stack.Screen name="MyProductlist" component={MyProductlist} />
        <Stack.Screen name="MktDetails" component={MktDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
