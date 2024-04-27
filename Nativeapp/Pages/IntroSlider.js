import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
const slides = [
  {
    key: 1,
    // title: 'Title 1',
    title: 'Enter your products details to list in Markopolo',
    image: require('./image/ecom-store.png'),
    backgroundColor: '#2775f2',
  },
  {
    key: 2,
    // title: 'Title 2',
    title:
      'Markopolo assigns you a dedicated marketing person for your product',
    image: require('./image/ecom-marketing.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    // title: 'Rocket guy',
    title:
      'Markopolo promotes your product and get bulk orders on free of cost',
    image: require('./image/ecom-delivary.png'),
    backgroundColor: '#22bcb5',
  },
];

const IntroSlider = ({onIntroDone}) => {
  function onDone() {
    onIntroDone();
  }
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 30,
        }}
      >
        <Image
          source={item.image}
          style={{objectFit: 'contain', height: 320}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', margin: 20}}>
          {item.title}
        </Text>
        {/* <Text style={{fontSize: 17}}>{item.text}</Text> */}
      </View>
    );
  };
  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};
export default IntroSlider;
