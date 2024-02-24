import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Animated } from 'react-native';

interface CardProps {
  image: number; 
  onPress: () => void;
  animation: Animated.Value;
}

const Card: React.FC<CardProps> = ({ image, onPress, animation }) => {
  const frontImageStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  };

  const backImageStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/1.png')}
          style={[styles.image, frontImageStyle]}
        />
        <Animated.Image
          source={require('../assets/back.png')}
          style={[styles.image, backImageStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'lightblue',
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
});

export default Card;
