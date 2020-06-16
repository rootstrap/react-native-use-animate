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
 * @param {number} delay - The number of miliseconds that it should pass before start animating
 * @param {function} easing - The `Easing` module has tons of pre-defined
 * curves, or you can use your own function
 * @param {string} useNativeDriver - useNativeDriver - check Animated API for reference
 * @param {boolean} animate - false if this animation is being used inside a parallel
 *  or sequence animation
 * @param {function} callback - The method it should call after the animation has
 *  ended (in case animate is false then this won't be executed,
 * it should be passed as part of the Parallel's or sequence's callback)
 * @param {ref} referenceValue - In case you want to reuse an animated value you
 * can pass it as referenceValue
 * @param {boolean} isInteraction - Whether or not this animation creates an
 * "interaction handle" on the InteractionManager. Default true.
 */
const useAnimate = ({
  fromValue = 0,
  toValue = 1,
  bounce = false,
  iterations = 1,
  duration = 800,
  delay = 0,
  easing,
  useNativeDriver = false,
  animate = true,
  callback,
  referenceValue,
  isInteraction = true,
}) => {
  const animatedValue =
    referenceValue || useRef(new Animated.Value(fromValue)).current;
  const baseConfig = {
    easing,
    isInteraction,
    duration: bounce ? duration / 2 : duration,
    useNativeDriver,
  };

  const sequence = [
    Animated.timing(animatedValue, {
      delay,
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

  const reset = useCallback(() => {
    animation.reset();
  }, [animation]);

  const startAnimating = useCallback(
    ({ callback: nextAnimation }) => {
      animation.reset();

      const callbackAnimation = () => {
        callback && callback({ animation, animatedValue });
        nextAnimation && nextAnimation();
      };

      if (delay) {
        Animated.sequence([Animated.delay(delay), animation]).start(
          callbackAnimation,
        );
      } else {
        animation.start(callbackAnimation);
      }
    },
    [animation, callback],
  );

  useEffect(() => {
    animate && startAnimating({ callback: () => {} });
  }, [fromValue, toValue, bounce, duration, animate, startAnimating, reset]);

  return { interpolate, animatedValue, startAnimating, reset };
};

export default useAnimate;
