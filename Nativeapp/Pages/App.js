import {useState, useRef, useEffect} from 'react';
import {Alert, Animated, Text, View} from 'react-native';
import BottomStrip from '../Components/BottomStrip';
import Splash from './Splash';
import IntroSlider from './IntroSlider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
const Stack = createNativeStackNavigator();

const App = () => {
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 2000);
  return splash ? (
    <Splash></Splash>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomStrip"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
        <Stack.Screen name="BottomStrip" component={BottomStrip} />
        {/* <Stack.Screen name="Getproduct" component={Getproduct} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
