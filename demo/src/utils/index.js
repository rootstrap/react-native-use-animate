import { Dimensions, Platform, StatusBar } from 'react-native';

export const randomColor = () => {
  return (
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')'
  );
};

// DIMENSIONS
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XS_MAX_WIDTH = 414;
const XS_MAX_HEIGHT = 896;

export const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIPhoneX =
    (WIDTH === X_WIDTH && HEIGHT === X_HEIGHT) ||
    (WIDTH === XS_MAX_WIDTH && HEIGHT === XS_MAX_HEIGHT);
}

export const IPHONE_X_STATUS_BAR_HEIGHT = 44;
const IPHONE_STATUS_BAR_HEIGHT = 20;
const IPHONE_X_BOTTOM_SPACE = 34;

export const BOTTOM_SPACE = isIPhoneX ? IPHONE_X_BOTTOM_SPACE : 0;

const getStatusBarHeight = skipAndroid => {
  return Platform.select({
    ios: isIPhoneX ? IPHONE_X_STATUS_BAR_HEIGHT : IPHONE_STATUS_BAR_HEIGHT,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
};

export const STATUS_BAR_HEIGHT = getStatusBarHeight(true);
