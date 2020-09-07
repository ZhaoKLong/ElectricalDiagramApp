import {saveInfo, storage} from './storage';
import {ToastAndroid} from 'react-native';

/**
 * 请求 API 接口
 *
 * @param {Object} options
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.params - url 参数
 * @param {Object} options.data - 请求体数据
 * @returns {Promise<any> | Promise}
 */
export default function request({url, method, params, data, headers}) {
    let isOk;
    let requestUrl;
    return new Promise((resolve, reject) => {
        storage.load({
            key: 'urlInfo',
            syncInBackground: true
        }).then(ret => fetch(ret.url + url, {
                method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify(data)
            }).then(response => {
                isOk = !!response.ok;
                requestUrl = response.url;
                if (response.status < 200 || response.status >= 300) {
                    isOk = false
                }
                const token = response.headers.get('access_token');
                const refreshToken = response.headers.get('refresh_token');
                if (token && refreshToken) {
                    console.log('token已经过期，重新获取到新的token:' + token + 'refreshtoken:' + refreshToken);
                    storage.load({
                        key: 'loginInfo',
                        syncInBackground: true
                    }).then(tokenRet => saveInfo({
                        ...tokenRet,
                        token: token,
                        refresh_token: refreshToken
                    }))
                }
                return response.json()
            }).then(responseData => {
                if (isOk && !responseData.resultCode) {
                    resolve(responseData)
                } else {
                    ToastAndroid.show(
                        `请求错误: ${responseData.resultMsg || `${requestUrl}请求失败！`}`,
                        ToastAndroid.SHORT
                    );
                    reject(responseData)
                }
            }).catch((err) => {
                reject(err)
            })
        ).catch(err => {
            console.log(err || err.message)
        })
    })
}

export function requestUrl({url, method, params, data, headers}) {
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(data)
        }).then(response => {
            isOk = !!response.ok;
            return response.json()
        }).then(responseData => {
            if (isOk && responseData.resultCode === 0) {
                resolve(responseData)
            } else {
                reject(responseData)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export function requestWithToken(options) {
    return storage.load({
        key: 'loginInfo',
        syncInBackground: true
    }).then(ret => request({
        ...options,
        headers: {
            access_token: ret.token,
            refresh_token: ret.refresh_token
        }
    })).catch(err => {
        console.log(err || err.message)
    })
}
