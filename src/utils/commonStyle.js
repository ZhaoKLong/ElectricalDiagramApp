import {Dimensions, StyleSheet} from "react-native";
import {defaultBackgroundColor, defaultColor} from "./config";

export const colorStyles = {
    background: defaultBackgroundColor,
    white: '#fff',
    thinBorder: '#e5e5e5',
    strongBorder: '#5A5959',
    red: '#f00',
    titleText: '#333',
    text: '#666',
    valueText: '#999',
    table: '#1a1a1a',
};

/**
 * 57c7f7 主色调
 * fff 组件内容的背景色
 * e5e5e5 组件边框线（浅色）
 * 5A5959 备注等长字段边框线（深色）
 * f00 红色（突出色调）
 * 333 标题色
 * 666 常规色
 * 999 文本色
 * 1a1a1a table 标题色
 * @type {*|$ObjMap<S>}
 */
export const commonStyles = StyleSheet.create({
    // 页面背景
    container: {
        flex: 1,
        backgroundColor: defaultBackgroundColor
    },

    // 列表界面筛选框
    headerSearch: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 10
    },

    // 键值框
    itemTextView: {
        height: 45,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5'
    },

    // tableTitle框
    tableTitle: {
        height: 45,
        backgroundColor: '#fff',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5'
    },

    // tableBody框
    bodyWrapper: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5',
        backgroundColor: '#fff'
    },

    // 独行title框
    titleWrapper: {
        marginTop: 10,
        height: 35,
        justifyContent: 'center',
        paddingLeft: 10,
        backgroundColor: '#fff'
    },

    // 备注信息框
    remarkWrapper: {
        height: 132,
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5'
    },

    // 备注信息输入框
    remarkTextInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        borderColor: '#5A5959',
        padding: 10
    },

    //提交按钮框
    buttonWrapper: {
        height: 66,
        paddingHorizontal: 16,
        justifyContent: 'center'
    },

    // ios日期选择器
    iosDatePicker: {
        left: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 300
    },

    // 8长宽圆点
    circle8: {
        marginRight: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#f00'
    },

    // 20小图标
    icon20: {
        width: 20,
        height: 20
    },

    // 默认字体
    defaultText: {
        fontSize: 14,
        color: '#666'
    },

    // title字体
    titleText: {
        fontSize: 14,
        color: '#333',
        marginRight: 10
    },

    // value字体
    valueText: {
        fontSize: 14,
        color: '#999'
    },

    // 可点击字体
    searchText: {
        fontSize: 14,
        color: defaultColor
    },

    // table标题字体
    tableTitleText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#1a1a1a'
    },

    // table内部字体
    tableValueText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#666'
    },
});