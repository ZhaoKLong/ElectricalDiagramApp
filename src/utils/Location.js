import {NativeModules} from 'react-native';

/**
 * 获取定位权限是否开启
 */
export const isOpenLocation = (callback) => {
    NativeModules.LocationFetch.isOpen(callback)
};

/**
 * 获取定位信息服务是否开启
 */
export const isOpenLocationService = (callback) => {
    NativeModules.LocationFetch.isLocationEnabled(callback)
};

