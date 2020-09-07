import {NativeModules} from 'react-native';

/**
 * 打印文字，文字宽度满一行自动换行排版，不满一整行不打印除非强制换行
 * @param content 要打印的文字字符串
 * @param size 字体大小
 * @param isBold 是否加粗
 * @param isUnderLine 是否加下划线
 * @param align 对齐方式(0.左对齐,1.居中,2.右对齐)
 */
export const printDetail = (content, size, isBold, isUnderLine, align) => {
    NativeModules.Print.printText(content, size, isBold, isUnderLine, align)
};

/**
 * 打印图片
 * @param url 图片地址
 */
export const printBitmap = (url) => {
    NativeModules.Print.printBitmap(url)
};

/**
 * 打印二维条码
 * data:            二维码数据
 * modulesize:    二维码块大小(单位:点, 取值 1 至 16 )
 * errorlevel:    二维码纠错等级(0 至 3)，
 *               0 -- 纠错级别L ( 7%)，
 *               1 -- 纠错级别M (15%)，
 *               2 -- 纠错级别Q (25%)，
 *               3 -- 纠错级别H (30%)
 */
export const printQr = (data, modulesize, errorlevel, align) => {
    NativeModules.Print.printQr(data, modulesize, errorlevel, align)
};

/**
 * 打印一维条码
 * data:        条码数据
 * symbology:    条码类型
 *    0 -- UPC-A，        要求12位数字（最后一位校验位必须正确），但受限于打印机的宽度及条码宽度
 *    1 -- UPC-E，        要求8位数字（最后一位校验位必须正确），但受限于打印机的宽度及条码宽度
 *    2 -- JAN13(EAN13)，  要求13位数字（最后一位校验位必须正确），但受限于打印机的宽度及条码宽度
 *    3 -- JAN8(EAN8)，    要求8位数字（最后一位校验位必须正确），但受限于打印机的宽度及条码宽度
 *    4 -- CODE39，        数字英文及8个特殊符号且首尾为*号，但受限于打印机的宽度及条码宽度
 *    5 -- ITF，            字符为数字且小于14位，但受限于打印机的宽度及条码宽度
 *    6 -- CODABAR，        起始和终止必须为A-D，数据为0-9及6个特殊字符，长度任意但受限于打印机的宽度及条码宽度
 *    7 -- CODE93，        字符任意，长度任意但受限于打印机的宽度及条码宽度
 *    8 -- CODE128        字符任意，长度任意但受限于打印机的宽度及条码宽度
 * height:        条码高度, 取值1到255, 默认162
 * width:        条码宽度, 取值2至6, 默认2
 * textposition:    文字位置 0--不打印文字, 1--文字在条码上方, 2--文字在条码下方, 3--条码上下方均打印
 */
export const printBar = (data, symbology, height, width, textposition) => {
    NativeModules.Print.printBarCode(data, symbology, height, width, textposition)
};

/**
 * 空打三行
 */
export const print3Line = () => {
    NativeModules.Print.print3Line()
};

/**
 * 空打一行
 */
export const print1Line = () => {
    NativeModules.Print.print1Line()
};
