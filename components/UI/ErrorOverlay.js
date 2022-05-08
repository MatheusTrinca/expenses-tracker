import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const LoadingOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error ocurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>OK</Button>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
