import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated } from 'react-native';
import Card from './Card';

const images = {
  1: require('../assets/1.png'),
  2: require('../assets/2.png'),
  // ...
  12: require('../assets/12.png'),
};

const GameBoard: React.FC<{}> = () => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cardAnimations] = useState(() =>
    Array(12).fill(new Animated.Value(0))
  );

  const handleCardPress = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      console.log('Card pressed:', index);
      setFlipped((prevFlipped) => [...prevFlipped, index]);
      animateCardFlip(index);
    }
  };

  const animateCardFlip = (index: number) => {
    Animated.timing(cardAnimations[index], {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => console.log('Card flipped:', index));
  };

  const checkForMatch = () => {
    if (flipped.length === 2) {
      if (flipped[0] === flipped[1]) {
        // Match found
        setMatched((prevMatched) => [...prevMatched, flipped[0], flipped[1]]);
        setFlipped([]);
      } else {
        // No match, reset flipped cards after a short delay
        setTimeout(() => {
          setFlipped([]);
          console.log('No match, cards reset');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    checkForMatch();
  }, [flipped]);

  useEffect(() => {
    // Check for winner when all cards are matched
    if (matched.length === 12) {
      console.log('All cards matched, winner!');
      Alert.alert('¡Felicidades!', 'Has ganado el juego.');
    }
  }, [matched]);

  // Renderizado de componentes y lógica adicional del juego

  return (
    // JSX para renderizar el tablero del juego
    <View>
      {/* Renderizar cartas, etc. */}
    </View>
  );
};

export default GameBoard;
