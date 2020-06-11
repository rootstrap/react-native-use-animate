import { useCallback, useEffect } from 'react';
import { Animated } from 'react-native';

const _useAnimate = ({
  isParallel = false,
  animations = [],
  iterations = 1,
  animate = true,
  callback = () => {},
}) => {
  const realAnimations = animations.map(({ animation }) => {
    return animation;
  });
  const animationType = isParallel ? 'parallel' : 'sequence';
  const parallelAnimation =
    iterations === 1
      ? Animated[animationType](realAnimations)
      : Animated.loop(Animated[animationType](realAnimations), { iterations });

  const startAnimating = useCallback(() => {
    parallelAnimation.start(callback);
  }, [parallelAnimation, callback]);

  useEffect(() => {
    animate && startAnimating && startAnimating();
  }, [animate, startAnimating]);

  return { animation: parallelAnimation };
};

export const useAnimateParallel = props =>
  _useAnimate({ ...props, isParallel: true });
export const useAnimateSequence = props =>
  _useAnimate({ ...props, isParallel: false });
