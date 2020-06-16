import { useCallback, useEffect } from 'react';

const animateInSequence = ({
  animations,
  current,
  sequenceCallback,
  inverted = false,
}) => {
  let nextIndex = current < animations.length - 1 ? current + 1 : -1;
  if (inverted) {
    nextIndex = current > 0 ? current - 1 : -1;
  }
  const callback = () => {
    if (nextIndex === -1) {
      sequenceCallback && sequenceCallback();
    } else {
      animateInSequence({
        animations,
        current: nextIndex,
        inverted,
        sequenceCallback,
      });
    }
  };
  animations[current].startAnimating(callback);
};

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
 * @param {boolean} bounce - true if you want the sequence to go back to its initial state
 * @param {boolean} inverted - true if the order of animations should be inverted
 */
const useAnimateSequence = ({
  animations = [],
  iterations = 1,
  animate = true,
  callback = () => {},
  bounce = false,
  inverted = false,
}) => {
  const sequenceIteration = ({ iterationCallback }) => {
    animateInSequence({
      animations,
      current: 0,
      sequenceCallback: iterationCallback,
    });
    bounce &&
      animateInSequence({
        animations,
        current: animations.length - 1,
        sequenceCallback: iterationCallback,
        inverted,
      });
  };

  const resetAnimations = () => {
    animations.forEach((animation) => {
      animation.reset();
    });
  };

  const startAnimatingSequence = useCallback((nextAnimation = () => {}) => {
    if (iterations === 1 || iterations === 0) {
      sequenceIteration();
    } else if (iterations === -1) {
      sequenceIteration({
        iterationCallback: () => {
          resetAnimations();
          startAnimatingSequence();
        },
      });
    } else {
      for (const i in [(1).iterations]) {
        sequenceIteration({ iterationCallback: callback });
      }
    }
    nextAnimation && nextAnimation();
    callback();
  }, []);

  useEffect(() => {
    animate && startAnimatingSequence();
  }, [animate]);

  return { startAnimating: startAnimatingSequence, reset: resetAnimations };
};

export default useAnimateSequence;
