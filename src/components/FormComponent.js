import React, {Component} from 'react';
import {
    ScrollView,
    ActivityIndicator,
    DatePickerAndroid,
    DeviceEventEmitter,
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {getDateOfText, getDateText, getFewDaysAfter} from "../utils/dateUtils";
import {requestWithToken} from "../utils/request";
import Picker from "react-native-picker";
import {searchTextOfArray} from "../utils/utils";
import {commonStyles} from "../utils/commonStyle";
import ButtonComponent from "./ButtonComponent";
import {defaultColor} from "../utils/config";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get('window').width;

export const formType = {
    text: 0, // 字符
    num: 1, // 数字
    date: 2,  // 单个日期
    dateRange: 3,  // 日期范围
    select: 4, // 列表选择
    radio: 5, // 单选
    checkBox: 6, // 多选
    picture: 7, // 图片
};

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: [],
            result: {}
        }
    }

    componentWillUnmount(): void {
    }

    componentDidMount(): void {
        this.init()
    }

    // 初始化
    init = () => {
        const {form} = this.props;
        const result = {};
        form.forEach(item => {
                if (item.default === undefined) {
                    if (item.type === 1) {
                        result[item.key] = '0'
                    } else if (item.type === 2) {
                        result[item.key] = getDateText()
                    } else if (item.type === 3) {
                        result[`${item.key}StartDate`] = getDateText();
                        result[`${item.key}EndDate`] = getDateText()
                    } else if (item.type === 4 || item.type === 5) {
                        result[item.key] = null
                    } else {
                        result[item.key] = ''
                    }
                } else {
                    result[item.key] = item.default
                }
            }
        );
        this.setState({result, form})
    };

    //Android进行创建时间日期选择器
    async showPicker(options, key) {
        try {
            const option = {date: options.date};
            if (options.minDate) {
                option.minDate = options.minDate
            }
            if (options.maxDate) {
                option.maxDate = options.maxDate
            }
            const {action, year, month, day} = await DatePickerAndroid.open(option);
            const result = this.state.result;
            if (action !== DatePickerAndroid.dismissedAction) {
                result[key] = getDateText(new Date(year, month, day));
                this.setState({result})
            }
        } catch ({code, message}) {
            console.warn(`Error in example : `, message)
        }
    }

    //IOS进行创建时间日期选择器
    showDatePicker = (isMax) => {
        this.setState({type: isMax ? 'max' : 'min'}, () => this.setState({showSelect: true}))
    };

    // 下拉列表选择
    showTypePicker = (Pitem) => {
        const result = this.state.result;
        Picker.init({
            pickerData: Pitem.selectList.map(item => item.title),
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择类型',
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                result[Pitem.key] = Pitem.selectList[pickedIndex[0]].value;
                this.setState({result})
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex)
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex)
            }
        });
        Picker.show()
    };

    // 输入框字符变化
    onChangeText = (value, key) => {
        const result = this.state.result;
        result[key] = value;
        this.setState({result})
    };

    // 下拉选择title展示
    getSelectTitle = (Pitem) => {
        const value = this.state.result[Pitem.key];
        let title = '请选择';
        Pitem.selectList.forEach(item => {
            if (item.value === value) {
                title = item.title
            }
        });
        return title
    };

    // 单选
    radio = (Pitem, Pindex) => {
        const result = this.state.result;
        Pitem.selectList.forEach((item, index) => {
                if (Pindex === index) {
                    result[Pitem.key] = item[Pitem.value]
                }
            }
        );
        this.setState({result})
    };

    // 多选
    check = (Pitem, Pindex) => {
        const result = this.state.result;
        const value = result[Pitem.key];
        Pitem.selectList.forEach((item, index) => {
                if (Pindex === index) {
                    if (value === '') {
                        result[Pitem.key] = `${value}`
                    } else if (value.split(',').indexOf(item[Pitem.value]) === -1) {
                        result[Pitem.key] = `${value},${item[Pitem.value]}`
                    } else {
                        result[Pitem.key] = value.split(',').splice(value.split(',').indexOf(item[Pitem.value])).join(',')
                    }
                }
            }
        );
        this.setState({result})
    };

    // 样式渲染
    renderFormItem = () => {
        const {form} = this.state;
        return (
            <View>
                {form.map(item => {
                        if (item.type === 5) {
                            return (
                                <View style={[commonStyles.itemTextView, {height: 'auto'}]}>
                                    <Text>
                                        {item.label}
                                    </Text>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20}}>
                                        {item.selectList.map((Citem, index) =>
                                            <TouchableOpacity
                                                style={{
                                                    height: item.lineHeight ? item.lineHeight : 45,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: 10
                                                }}
                                                onPress={() => this.radio(item, index)}
                                            >
                                                <View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderColor: '#e5e5e5',
                                                    borderRadius: 10,
                                                    borderWidth: 2,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {Citem[item.value] === this.state.result[item.key] ?
                                                        <View style={{
                                                            backgroundColor: defaultColor,
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: 6
                                                        }}/> :
                                                        null
                                                    }
                                                </View>
                                                <Text style={{marginLeft: 5, fontSize: 12}}>{Citem[item.title]}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )
                        } else if (item.type === 6) {
                            return (
                                <View style={[commonStyles.itemTextView, {height: 'auto'}]}>
                                    <Text>
                                        {item.label}
                                    </Text>
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20}}>
                                        {item.selectList.map((Citem, index) =>
                                            <TouchableOpacity
                                                style={{
                                                    height: item.lineHeight ? item.lineHeight : 45,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: 10
                                                }}
                                                onPress={() => this.check(item, index)}
                                            >
                                                <View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderColor: '#e5e5e5',
                                                    borderWidth: 2,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {this.state.result[item.key].split(',').indexOf(Citem[item.value]) !== -1 ?
                                                        <FontAwesome name={'check'} size={16} color={defaultColor}/> :
                                                        null
                                                    }
                                                </View>
                                                <Text style={{marginLeft: 5, fontSize: 12}}>{Citem[item.title]}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )
                        } else if (item.type === 7) {
                            return (
                                null
                            )
                        } else {
                            return (
                                <View style={[commonStyles.itemTextView, item.height ? {height: item.height} : {}]}>
                                    <Text>
                                        {item.label}
                                    </Text>
                                    {item.type === 0 || item.type === 1 ?
                                        <TextInput
                                            style={{minWidth: 48, padding: 2}}
                                            defaultValue={this.state.result[item.key]}
                                            keyboardType={item.type === 0 ? 'default' : 'numeric'}
                                            placeholder={`请输入`}
                                            underlineColorAndroid={'transparent'}
                                            onChangeText={(value) => {
                                                this.onChangeText(value, item.key)
                                            }}
                                        /> :
                                        item.type === 2 ?
                                            <TouchableOpacity
                                                onPress={this.showPicker.bind(this, {
                                                    date: getDateOfText(this.state.result[item.key]),
                                                    minDate: item.limit ? item.limit[0] === null ? null : getFewDaysAfter(new Date(), item.limit[0]) : null,
                                                    maxDate: item.limit ? item.limit[1] === null ? null : getFewDaysAfter(new Date(), item.limit[1]) : null
                                                }, item.key)}
                                            >
                                                <Text style={commonStyles.searchText}>
                                                    {this.state.result[item.key]}
                                                </Text>
                                            </TouchableOpacity> :
                                            item.type === 3 ?
                                                <View style={{flexDirection: 'row'}}>
                                                    <TouchableOpacity
                                                        onPress={this.showPicker.bind(this, {
                                                            date: getDateOfText(this.state.result[`${item.key}StartDate`]),
                                                            minDate: item.limit ? item.limit[0] === null ? null : getFewDaysAfter(new Date(), item.limit[0]) : null,
                                                            maxDate: getDateOfText(this.state.result[`${item.key}EndDate`])
                                                        }, `${item.key}StartDate`)}
                                                    >
                                                        <Text style={commonStyles.searchText}>
                                                            {this.state.result[`${item.key}StartDate`]}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <Text style={{paddingHorizontal: 15}}>-</Text>
                                                    <TouchableOpacity
                                                        onPress={this.showPicker.bind(this, {
                                                            date: getDateOfText(this.state.result[`${item.key}EndDate`]),
                                                            minDate: getDateOfText(this.state.result[`${item.key}StartDate`]),
                                                            maxDate: item.limit ? item.limit[1] === null ? null : getFewDaysAfter(new Date(), item.limit[1]) : null
                                                        }, `${item.key}EndDate`)}
                                                    >
                                                        <Text style={commonStyles.searchText}>
                                                            {this.state.result[`${item.key}EndDate`]}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View> :
                                                <TouchableOpacity
                                                    onPress={() => this.showTypePicker(item)}
                                                >
                                                    <Text style={commonStyles.searchText}>
                                                        {this.getSelectTitle(item)}
                                                    </Text>
                                                </TouchableOpacity>
                                    }
                                </View>
                            )
                        }
                    }
                )}
            </View>
        )
    };

    // 提交方法
    submit = () => {
        const {submit} = this.props;
        submit(this.state.result)
    };

    render() {
        const {submitText} = this.props;
        return (
            <ScrollView>
                {this.renderFormItem()}
                <View style={commonStyles.buttonWrapper}>
                    <ButtonComponent
                        onPress={() => this.submit()}
                    >
                        {submitText || '提交'}
                    </ButtonComponent>
                </View>
            </ScrollView>
        )
    }
}
