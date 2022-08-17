import {Dimensions, PixelRatio} from 'react-native';

const {width} = Dimensions.get('window');

const scale = width / 375;

export function normalize(size) {
  return PixelRatio.roundToNearestPixel(size * scale);
}
