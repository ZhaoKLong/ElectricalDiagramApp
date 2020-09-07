/**
 * 常用的工具
 */
/**
 * 版本比较
 * @param curV 当前版本
 * @param reqV 服务器版本
 * @returns {boolean}
 */
export const compareVersion = (curV, reqV) => {
    if (curV && reqV) {
        // 将两个版本号拆成数字
        const arr1 = curV.split('.');
        const arr2 = reqV.split('.');
        const minLength = Math.min(arr1.length, arr2.length);
        let position = 0;
        // 依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength) {
            // 当前版本大于服务器版本,不需要更新
            if (parseInt(arr1[position]) > parseInt(arr2[position])) {
                return false
            }
            // 当前版本小于服务器版本,需要更新
            if (parseInt(arr1[position]) < parseInt(arr2[position])) {
                return true
            }
            position++
        }
        return false
    } else {
        // 输入为空
        return true
    }
};

export const replaceItemOfArray = (array, index, key, value) => {
    const list = [];
    array.forEach((item, itemIndex) => {
        if (itemIndex === index) {
            const itemDetail = item;
            itemDetail[key] = value;
            list.push(itemDetail)
        } else {
            list.push(item)
        }
    });
    return list
};

/**
 * 中文段落开头空两格
 * @type {string}
 */
export const emptyTwo = `        `;

/**
 * 返回数组中包含字符串的项
 * @param array 数组
 * @param key 字段范围（","分割）
 * @param searchText 匹配字符串
 */
export const searchTextOfArray = (array, key, searchText) => {
    if (array) {
        if (searchText) {
            const keys = key.split(',');
            const resultList = [];
            array.forEach(item => {
                let include = false;
                keys.forEach(keysItem => {
                    if (item[keysItem].indexOf(searchText) !== -1) {
                        include = true
                    }
                });
                if (include) {
                    resultList.push(item)
                }
            });
            return resultList
        }
        return array
    }
    return []
};

/**
 * 对字符串信息进行加密
 * @param text 需要加密的字符串
 * @returns {*}
 */
export const privacyText = (text) => {
    let changeText = text.split('');
    if (changeText.length > 1) {
        if (changeText.length === 2) {
            // 一般为两位的姓名
            changeText.splice(1, 1, '*')
        } else if (changeText.length === 11) {
            // 一般为手机号
            changeText.splice(3, 4, '****')
        } else if (changeText.length === 18) {
            // 一般为身份证号
            changeText.splice(6, 10, '**********')
        } else {
            // 其他情况(包括三位及以上的名字)
            changeText = text.split('').map((item, index) => {
                if (index !== 0 && index !== text.length - 1) {
                    return '*'
                }
                return item
            })
        }
    }
    return changeText.join('') || '-'
};
