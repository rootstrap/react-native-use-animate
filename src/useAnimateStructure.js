import { useCallback, useEffect } from 'react';
import { Animated } from 'react-native';

const useAnimateStructure = ({
  animationType,
  animations = [],
  iterations = 1,
  animate = true,
  callback = () => {},
}) => {
  const realAnimations = animations.map(({ animation }) => {
    return animation;
  });
  const animation = Animated[animationType](realAnimations);
  const structuredAnimation =
    iterations === 1 ? animation : Animated.loop(animation, { iterations });

  const startAnimating = useCallback(() => {
    structuredAnimation.start(callback);
  }, [structuredAnimation, callback]);

  useEffect(() => {
    animate && startAnimating && startAnimating();
  }, [animate, startAnimating]);

  return { animation: structuredAnimation, callback };
};

/**
 * @function useAnimateParallel
 * @param {array} animations - The array of animations
 * @param {number} iterations - The amount of times the animation should run,
 * -1 if you want to be an infinite loop
 * @param {boolean} animate - false if this animation is being used inside a parallel
 *  or sequence animation
 * @param {function} callback - The method it should call after the animation has
 *  ended (in case animate is false then this won't be executed,
 * it should be passed as part of the Parallel's or sequence's callback)
 */
export const useAnimateParallel = props =>
  useAnimateStructure({ ...props, animationType: 'parallel' });

/**
 * @function useAnimateSequence
 * @param {array} animations - The array of animations
 * @param {number} iterations - The amount of times the animation should run,
 * -1 if you want to be an infinite loop
 * @param {boolean} animate - false if this animation is being used inside a parallel
 *  or sequence animation
 * @param {function} callback - The method it should call after the animation has
 *  ended (in case animate is false then this won't be executed,
 * it should be passed as part of the Parallel's or sequence's callback)
 */
export const useAnimateSequence = props =>
  useAnimateStructure({ ...props, animationType: 'sequence' });
