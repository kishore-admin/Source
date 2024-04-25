import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import ReferEarn from '../Pages/MarketingDetails';
import Profile from '../Pages/UserAccount';
import Getproduct from '../Pages/GetProduct';
import HelpCenter from '../Pages/HelpCenter';
const Tab = createBottomTabNavigator();
const BottomStrip = () => {
  // return (
  //   <View
  //     style={{
  //       flex: 1,

  //       backgroundColor: 'gray',
  //       flexDirection: 'row',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <View
  //       style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}
  //     >
  //       <TouchableOpacity
  //         style={{alignItems: 'center'}}
  //         onPress={() => navigation.navigate('Home')}
  //       >
  //         <Icon name="home" size={25} color="#ffffff" />
  //         <Text>Home</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={{alignItems: 'center'}}
  //         onPress={() => navigation.navigate('Product')}
  //       >
  //         <Icon name="logo-dropbox" size={25} color="#ffffff" />
  //         <Text>Manufacture</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{alignItems: 'center'}}>
  //         <Icon name="person-circle" size={25} color="#ffffff" />
  //         <Text>Account</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={{alignItems: 'center'}}>
  //         <Icon name="cart" size={25} color="#ffffff" />
  //         <Text>Cart</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="home" size={20} color="#000" />
              <Text style={{color: focused ? '#000' : '#000', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Referal"
        component={ReferEarn}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="person-add" size={20} color="#000" />
              <Text style={{color: focused ? '#000' : '#000', fontSize: 12}}>
                Referal
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Getproduct}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="add-circle" size={20} color="#000" />
              <Text style={{color: focused ? '#000' : '#000', fontSize: 12}}>
                Product
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="help-buoy" size={20} color="#000" />
              <Text style={{color: focused ? '#000' : '#000', fontSize: 12}}>
                Help Center
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="person-circle" size={20} color="#000" />
              <Text style={{color: focused ? '#000' : '#000', fontSize: 12}}>
                Account
              </Text>
            </View>
          ),
        }}
      />
      {/* home , add product, account, support, marketdetaisl */}
    </Tab.Navigator>
  );
};
export default BottomStrip;
