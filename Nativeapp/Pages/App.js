import {Text, View} from 'react-native';
import Login from './Login';
import Home from './Home';
import Getproduct from './GetProduct';
import BottomStrip from '../Components/BottomStrip';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash';
import {useState} from 'react';
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
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Getproduct} />
        <Stack.Screen name="BottomStrip" component={BottomStrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
