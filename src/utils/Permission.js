import {NativeModules} from 'react-native';

/**
 * 获取权限是否开启
 */
export const lacksPermission = (Permission) => {
    NativeModules.Permission.lacksPermission(Permission)
};
