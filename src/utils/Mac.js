import {NativeModules} from 'react-native';

/**
 * 获取Mac地址
 */
export const getMac = (callback) => {
    NativeModules.Mac.getMac(callback)
};

/**
 * 获取SN编码
 */
export const getSN = (callback) => {
    NativeModules.Mac.getDeviceSN(callback)
};
