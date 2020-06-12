import React from 'react';
import { Animated } from 'react-native';

import { WIDTH, HEIGHT, STATUS_BAR_HEIGHT, BOTTOM_SPACE } from '../../utils';
import {
  useAnimate,
  useAnimateSequence,
} from '@rootstrap/react-native-use-animate';

import styles, { BOX_SIZE } from './styles';

const SequenceAnimatedBox = () => {
  const values = {
    duration: 1000,
    initialX: 0,
    finalX: WIDTH - BOX_SIZE,
    initialY: HEIGHT / 2 - STATUS_BAR_HEIGHT,
    finalY: HEIGHT - BOX_SIZE - STATUS_BAR_HEIGHT - BOTTOM_SPACE,
  };

  const animateConfig = {
    duration: values.duration,
    animate: false,
  };

  const step1 = useAnimate({
    fromValue: values.initialX,
    toValue: values.finalX,
    ...animateConfig,
  });

  const step2 = useAnimate({
    fromValue: values.initialY,
    toValue: values.finalY,
    ...animateConfig,
  });

  const step3 = useAnimate({
    fromValue: 0,
    toValue: values.finalX - values.initialX,
    ...animateConfig,
  });

  const step4 = useAnimate({
    fromValue: 0,
    toValue: values.finalY - values.initialY,
    ...animateConfig,
  });

  useAnimateSequence({
    animations: [step1, step2, step3, step4],
    iterations: -1,
  });

  const animatedX = new Animated.subtract(
    step1.animatedValue,
    step3.animatedValue,
  );
  const animatedY = new Animated.subtract(
    step2.animatedValue,
    step4.animatedValue,
  );
  return (
    <Animated.View
      style={[
        styles.box,
        {
          left: animatedX,
          top: animatedY,
        },
      ]}
    />
  );
};

export default SequenceAnimatedBox;
