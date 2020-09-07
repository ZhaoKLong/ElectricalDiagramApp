import {PixelRatio, Dimensions} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;


/**
 * 按比例将设计的px转换成适应不同屏幕的dp
 * 采样仪默认宽度为360 结合实际进行调整
 * @param designPx 设计稿标注的px值
 * @returns {*|number}
 */
export function getRealDP(designPx) {
    console.log('getRealDP', designPx, ScreenWidth);
    return PixelRatio.roundToNearestPixel((designPx / 360) * ScreenWidth);
}
