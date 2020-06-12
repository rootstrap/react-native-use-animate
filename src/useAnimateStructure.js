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

export const useAnimateParallel = props =>
  useAnimateStructure({ ...props, animationType: 'parallel' });
export const useAnimateSequence = props =>
  useAnimateStructure({ ...props, animationType: 'sequence' });
