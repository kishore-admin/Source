import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native';
import Product from './Product.json';
import {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';

const Home = ({navigation}) => {
  const [filterData, setFilteredData] = useState('');
  const [Data, setData] = useState(Product);
  function fnlFilter() {
    // this.setState({searchText: searchText});
    // console.log(e);
    // alert('hi');
    // alert('1' + JSON.stringify(filterData));
    let filteredData = Data.filter(function (item) {
      return item.category.includes(filterData);
    });
    // alert(filteredData);
    setData(filteredData);
  }
  function fnlcart(item) {
    console.log(item);
  }
  const width = Dimensions.get('window').width;
  // const height = Dimensions.get('window').height;
  return (
    <ScrollView>
      <SafeAreaView style={{padding: 10}}>
        <View>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <Image
              style={{height: 40, width: 30}}
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VXmgKBoAvy1AqjLWAIQ8xYn9pNZWsGkDGYZq2ufDlQ&s',
              }}
            ></Image>
            <Text>A free marketing app for manufactures</Text>
          </View>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              style={styles.inputText}
              onChange={newText => setFilteredData(newText)}
              placeholder="Search"
            ></TextInput>
            <Icon
              name="cash-outline"
              size={30}
              color="green"
              // onPress={() => navigation.navigate('IntroSlider')}
            />
            <TouchableOpacity onPress={fnlFilter}></TouchableOpacity>
          </View>
          <Text style={styles.subHeading}>Category</Text>
          <FlatList
            style={{height: 85}}
            horizontal={true}
            data={Data}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  padding: 8,
                  height: 100,
                }}
              >
                <Image
                  style={styles.horizontalThumb}
                  source={{uri: item.image}}
                />
                <Text style={styles.horizontalName}>{item.category}</Text>
              </View>
            )}
          />
          <Text style={styles.subHeading}>Special offers</Text>
          <Carousel
            style={{alignItems: 'center'}}
            loop
            pagingEnabled={false}
            snapEnabled={false}
            width={width}
            height={80}
            autoPlay={true}
            data={Data}
            scrollAnimationDuration={4000}
            renderItem={({item}) => (
              <View>
                <Image style={styles.carouselImg} source={{uri: item.image}} />
              </View>
            )}
          />
          <Text style={styles.subHeading}>Products</Text>
          <FlatList
            style={{height: '100%', marginTop: 10}}
            numColumns={2}
            data={Data}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card}>
                <Image style={styles.thumb} source={{uri: item.image}} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.title}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 5,
                    }}
                  >
                    <Text style={styles.price}>$ {item.price}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'green',
                        borderRadius: 3,
                        paddingVertical: 2,
                        paddingHorizontal: 15,
                      }}
                      onPress={fnlcart}
                    >
                      <Text style={{fontSize: 12, color: '#fff'}}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    marginBottom: 10,
    flexDirection: 'column',
    width: '46%',
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  thumb: {
    marginVertical: 12,
    objectFit: 'contain',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  carouselImg: {
    objectFit: 'contain',
    height: 70,
  },
  horizontalThumb: {
    objectFit: 'contain',
    height: 40,
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingBottom: 15,
  },
  name: {
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
  },
  horizontalName: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    width: 40,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputText: {
    width: '85%',
    borderStyle: 'solid',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  subHeading: {
    color: 'black',
    fontWeight: '800',
    fontSize: 17,
    marginLeft: 5,
    marginBottom: 5,
  },
});
export default Home;
