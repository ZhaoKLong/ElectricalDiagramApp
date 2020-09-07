import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

function clear() {
    return AsyncStorage.clear()
}

function get(key, defaultValue = null) {
    return AsyncStorage.getItem(key).then(
        value => (value !== null ? JSON.parse(value) : defaultValue)
    )
}

function set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
    return AsyncStorage.removeItem(key)
}

function multiGet(...keys) {
    return AsyncStorage.multiGet([...keys]).then(stores => {
        const data = {};
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1])
        });
        return data
    })
}

function multiRemove(...keys) {
    return AsyncStorage.multiRemove([...keys])
}

export default {
    clear,
    get,
    set,
    remove,
    multiGet,
    multiRemove
}

export const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null
});

/**
 * 客户端缓存userInfo数据
 * @param Info
 */
export function saveInfo(Info) {
    storage.save({
        key: 'loginInfo',
        data: Info,
        expires: 1000 * 3600 * 24 * 7 // 七天过期
    })
}

/**
 * 请求路径
 * @param Info
 */
export function saveUrl(Info) {
    storage.save({
        key: 'urlInfo',
        data: Info,
        expires: null // 永不过期
    })
}

/**
 * 左右手模式
 * @param Info
 */
export function saveSwitch(Info) {
    storage.save({
        key: 'switch',
        data: Info,
        expires: null // 永不过期
    })
}

/**
 * 更新后是否启动过
 * @param Info
 */
export function saveFirstOpen(Info) {
    storage.save({
        key: 'firstOpen',
        data: Info,
        expires: null // 永不过期
    })
}

export function removeUser() {
    storage.remove({
        key: 'loginInfo'
    })
}

export function removeFirstOpen() {
    storage.remove({
        key: 'firstOpen'
    })
}
