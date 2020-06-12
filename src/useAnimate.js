import { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

/**
 * @function useAnimate
 * @param {number} fromValue - The value from which the animation will start
 * @param {number} toValue - The value to which the animation should end
 * @param {boolean} bounce - True if the animation should return to its initial state
 * @param {number} iterations - The amount of times the animation should run,
 * -1 if you want to be an infinite loop
 * @param {number} duration - The time it takes the value to go from fromValue to toValue
 *  (or back to its initial state if bounce is true)
 * @param {string} useNativeDriver - useNativeDriver
 * @param {boolean} animate - In case this animation will be used for a parallel
 *  or sequence animation then it should be false
 * @param {function} callback - The method it should call after the animation is
 *  ended (in case animate is false then this won't be executed,
 * it should be passed as part of the Parallel's or sequence's callback)
 * @param {ref} referenceValue - In case you want to reuse an animation you
 * can pass its animatedValue as referenceValue
 */
const useAnimate = ({
  fromValue = 0,
  toValue = 1,
  bounce = false,
  iterations = 1,
  duration = 800,
  useNativeDriver = false,
  animate = true,
  callback,
  referenceValue,
}) => {
  const animatedValue =
    referenceValue || useRef(new Animated.Value(fromValue)).current;
  const baseConfig = {
    duration: bounce ? duration / 2 : duration,
    useNativeDriver,
  };

  const sequence = [
    Animated.timing(animatedValue, {
      toValue,
      ...baseConfig,
    }),
  ];

  if (bounce) {
    sequence.push(
      Animated.timing(animatedValue, {
        toValue: fromValue,
        ...baseConfig,
      }),
    );
  }
  const sequenceAnimation = Animated.sequence(sequence);

  const interpolate = useCallback(
    ({ inputRange, outputRange }) =>
      animatedValue.interpolate({
        inputRange: inputRange || [fromValue, toValue],
        outputRange,
      }),
    [animatedValue, fromValue, toValue],
  );

  const animation =
    iterations === 1 || iterations === 0 || callback
      ? sequenceAnimation
      : Animated.loop(sequenceAnimation, { iterations });

  const startAnimating = useCallback(() => {
    animation.start(() => {
      callback && callback({ animation, animatedValue });
    });
  }, [animation, callback]);

  useEffect(() => {
    animate && startAnimating && startAnimating();
  }, [fromValue, toValue, bounce, duration, animate, startAnimating]);

  return { animation, interpolate, animatedValue, callback };
};

export default useAnimate;
