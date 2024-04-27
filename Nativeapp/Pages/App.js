import {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import BottomStrip from '../Components/BottomStrip';
import Splash from './Splash';
import IntroSlider from './IntroSlider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  const [splash, setSplash] = useState(true);
  const [intro, setIntro] = useState(false);
  setTimeout(() => {
    setIntro(true);
  }, 2000);
  function onStateChange() {
    setSplash(false);
    setIntro(false);
  }
  return splash ? (
    intro ? (
      <IntroSlider onIntroDone={onStateChange} />
    ) : (
      <Splash></Splash>
    )
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomStrip"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="BottomStrip" component={BottomStrip} />
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
