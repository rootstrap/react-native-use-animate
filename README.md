# @rootstrap/react-native-use-animate

[![Maintainability](https://api.codeclimate.com/v1/badges/a878b4be647cd2a9582c/maintainability)](https://codeclimate.com/github/rootstrap/react-native-use-animate/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a878b4be647cd2a9582c/test_coverage)](https://codeclimate.com/github/rootstrap/react-native-use-animate/test_coverage)

React Native animations made simple.

Whether you are looking to get started with animations in React Native or you need to add a simple animation to your app and are looking for a simple and light weight option, this is the library for you.

This library contains some simple animation hooks that will cover simple use cases and some complex ones as well.

## Demo

![demo-animation](https://user-images.githubusercontent.com/9297073/84530954-269ded00-acba-11ea-94f2-5edca89faa1d.gif)

To test it out yourself you can clone this repo and go into the `demo` folder, then run `expo start` and open the app on a simulator or device.

#### Just for android

Since the demo is an expo project, we also have the app published on Expo. All you have to do is download the [expo client app](https://expo.io/tools#client) and scan the following QR code:

![](https://user-images.githubusercontent.com/9297073/84525964-e1c28800-acb2-11ea-9396-bc2d107d4711.png)

This is only available for Android since Apple has restrictions on how apps can be published.

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

<!-- TODO: add gif -->

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
  const animatedX = useAnimate({
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

<!-- TODO: add gif -->

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
  const animatedOpacity = useAnimate({
    animate: false,
    bounce: true,
  });

  const animatedRotation = useAnimate({
    bounce: true,
    animate: false,
  });

  useAnimateParallel({
    animations: [animatedOpacity, animatedRotation],
    iterations: -1,
    duration: 1000,
  });

  return (
    <Animated.View
      style={[
        styles.box,
        {
          opacity: animatedOpacity.animatedValue,
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

<!-- TODO: add gif -->

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
  const animatedX = useAnimate({
    fromValue: 0,
    toValue: 200,
    animate: false,
  });

  const animatedY = useAnimate({
    fromValue: 0,
    toValue: 200,
    bounce: true,
    animate: false,
  });

  useAnimateSequence({
    animations: [animatedX, animatedY],
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

## Contributing

If you have an idea that could make this library better we would love to hear it. Please take a look at our [Contributing Guidelines](CONTRIBUTING.md) to get to know the rules and how to get started with your contribution.

## License

**@rootstrap/react-native-use-animate** is available under the MIT license. See the LICENSE file for more info.

## Credits

**@rootstrap/react-native-use-animate** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-use-animate/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
