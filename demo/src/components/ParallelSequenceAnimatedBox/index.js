import React, { useState, useCallback } from 'react';
import { Animated } from 'react-native';

import {
  WIDTH,
  HEIGHT,
  STATUS_BAR_HEIGHT,
  BOTTOM_SPACE,
  randomColor,
} from '../../utils';
import {
  useAnimate,
  useAnimateSequence,
  useAnimateParallel,
} from '@rootstrap/react-native-use-animate';

import styles, { BOX_SIZE } from './styles';

const ParallelSequenceAnimatedBox = () => {
  const values = {
    duration: 1000,
    initialX: 0,
    finalX: WIDTH - BOX_SIZE,
    initialY: HEIGHT / 2 - STATUS_BAR_HEIGHT,
    finalY: HEIGHT - BOX_SIZE - STATUS_BAR_HEIGHT - BOTTOM_SPACE,
  };

  const animatedRotation = useAnimate({
    duration: values.duration,
    animate: false,
    name: 'rotation',
  });

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

  const [animatedColors, setAnimatedColors] = useState({
    initialColor: randomColor(),
    finalColor: randomColor(),
  });

  const colorAnimationCallback = useCallback(() => {
    setAnimatedColors({
      initialColor: animatedColors.finalColor,
      finalColor: randomColor(),
    });
  }, [animatedColors.finalColor]);

  const colorAnimation = useAnimate({
    ...animateConfig,
    duration: values.duration * 4,
    bounce: true,
    animate: true,
    callback: colorAnimationCallback,
  });

  const rotationTranslationX = useAnimateParallel({
    animations: [animatedRotation, step1],
    animate: false,
  });

  const translationXBack = useAnimateParallel({
    animations: [step3, animatedRotation],
    animate: false,
  });

  useAnimateSequence({
    animations: [rotationTranslationX, step2, translationXBack, step4],
    iterations: -1,
  });

  const marginLeft = new Animated.subtract(
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
          left: marginLeft,
          top: animatedY,
          backgroundColor: colorAnimation.interpolate({
            outputRange: [
              animatedColors.initialColor,
              animatedColors.finalColor,
            ],
          }),
          transform: [
            {
              rotate: animatedRotation.interpolate({
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    />
  );
};

export default ParallelSequenceAnimatedBox;
