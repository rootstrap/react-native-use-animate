import React, { useState } from 'react';
import { View, Button } from 'react-native';

import styles from './styles';
import ParallelAnimatedBox from './src/components/ParallelAnimatedBox';
import SequenceAnimatedBox from './src/components/SequenceAnimatedBox';
import ParallelSequenceAnimatedBox from './src/components/ParallelSequenceAnimatedBox';

export default function App() {
  return (
    <View style={styles.container}>
      <ParallelAnimatedBox />
      <SequenceAnimatedBox />
    </View>
  );
}
