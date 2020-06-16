import { useCallback, useEffect } from 'react';

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
const useAnimateParallel = ({
  animations = [],
  iterations = 1,
  animate = true,
  callback = () => {},
}) => {
  const startAnimatingParallel = useCallback(({ callback: nextAnimation }) => {
    let animationsEnded = 0;
    for (const i in [(1).iterations]) {
      animations.forEach(({ startAnimating }) => {
        startAnimating({
          callback: () => {
            animationsEnded = animationsEnded + 1;
            if (animationsEnded === animations.length) {
              nextAnimation && nextAnimation();
              callback();
            }
          },
        });
      });
    }
  });

  const resetAnimations = () => {
    animations.forEach((animation) => {
      animation.reset();
    });
  };

  useEffect(() => {
    animate && startAnimatingParallel({ callback: () => {} });
  }, [animate]);

  return { startAnimating: startAnimatingParallel, reset: resetAnimations };
};

export default useAnimateParallel;
