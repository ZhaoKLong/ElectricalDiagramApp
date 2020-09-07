/**
 * 日期类工具
 */
import moment from "moment";

/**
 * 获取几天后的日期
 * @param start 开始日期
 * @param day 天数
 */
export const getFewDaysAfter = (start, day) => {
    let date = new Date();
    date.setDate(start.getDate() + day);
    return date
};

/**
 * 根据date获取字符串
 * @param date 日期date
 * @param isChinese 是否中文
 * @param format 格式(非中文适用moment格式化,默认'YYYY-MM-DD'，中文自定义0~...,默认'mm月dd日')
 *                  0 -- 'yyyy年mm月dd日'
 *                  1 -- 'yyyy年mm月'
 *                  2 -- 'dd日'
 */
export const getDateText = (date, isChinese, format) => {
    if (isChinese) {
        const dateText = moment(date || new Date()).format('YYYY-MM-DD');
        if (format) {
            switch (format) {
                case 0:
                    return `${dateText.substring(0, 4)}年${dateText.substring(5, 7)}月${dateText.substring(8, 10)}日`;
                case 1:
                    return `${dateText.substring(0, 4)}年${dateText.substring(5, 7)}月`;
                case 2:
                    return `${dateText.substring(8, 10)}日`;
            }
        } else {
            return `${dateText.substring(5, 7)}月${dateText.substring(8, 10)}日`
        }
    }
    return moment(date || new Date()).format(format || 'YYYY-MM-DD')
};

/**
 * 根据日期字符串返回日期
 * @param dateText 日期字符串('YYYY-MM-DD HH:mm:ss')
 */
export const getDateOfText = (dateText) => {
    return new Date(dateText.replace(/-/g, '/'))
};
