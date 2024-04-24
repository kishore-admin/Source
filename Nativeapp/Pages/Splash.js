import {Image, View, StyleSheet, Text} from 'react-native';
const Splash = () => {
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
