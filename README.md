# @rootstrap/react-native-use-animate

React Native animations made simple.

Whether you are looking to get started with animations in React Native or you need to add a simple animation to your app and are looking for a simple and light weight option, this is the library for you.

This library contains some simple animation hooks that will cover simple use cases and some complex ones as well.

## Installation

```
yarn add @rootstrap/react-native-use-animate
```

```
npm install @rootstrap/react-native-use-animate --save
```

And that's it! No linking needed no matter which version of react-native you are running.

## Usage

### Simple Animation

// TODO: add gif

```js
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useAnimate } from '@rootstrap/react-native-use-animate';

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

const AnimatedBox = () => {
  const animateX = useAnimate({
    fromValue: 0,
    toValue: 100,
    duration: 1000,
    iterations: -1,
    bounce: true,
  });

  return (
    <Animated.View style={[styles.box, { left: animatedX.animatedValue }]} />
  );
};
```

### Parallel Animations

// TODO: add gif

```js
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  useAnimate,
  useAnimateParallel,
} from '@rootstrap/react-native-use-animate';

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

const AnimatedBox = () => {
  const animateOpacity = useAnimate({
    animate: false,
    bounce: true,
  });

  const animatedRotation = useAnimate({
    bounce: true,
  });

  useAnimateParallel({
    animations: [animateOpacity, animateRotation],
    iterations: -1,
    duration: 1000,
  });

  return (
    <Animated.View
      style={[
        styles.box,
        {
          opacity: animateOpacity.animatedValue,
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
```

### Sequenced Animations

// TODO: add gif

```js
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  useAnimate,
  useAnimateSequence,
} from '@rootstrap/react-native-use-animate';

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

const AnimatedBox = () => {
  const animateX = useAnimate({
    fromValue: 0,
    toValue: 200,
    animate: false,
  });

  const animatedY = useAnimate({
    fromValue: 0,
    toValue: 200,
    bounce: true,
  });

  useAnimateSequence({
    animations: [animateX, animatedY],
    iterations: -1,
    duration: 1000,
  });

  return (
    <Animated.View
      style={[
        styles.box,
        {
          left: animatedX.animatedValue,
          top: animatedY.animatedValue,
        },
      ]}
    />
  );
};
```

## License

**@rootstrap/react-native-use-animate** is available under the MIT license. See the LICENSE file for more info.

## Credits

**@rootstrap/react-native-use-animate** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-use-animate/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
