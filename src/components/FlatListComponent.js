import React, {Component} from 'react';
import {
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
import NullDateView from "./NullDateViewComponent";
import Spinner from "react-native-loading-spinner-overlay";
import {getDateText, getFewDaysAfter} from "../utils/dateUtils";
import {requestWithToken} from "../utils/request";
import Picker from "react-native-picker";
import {searchTextOfArray} from "../utils/utils";

const width = Dimensions.get('window').width;

export const searchType = {
    RequestParameters: 0, // 请求参数(目前只支持日期)
    QueryText: 1, // 匹配字符串
    QueryType: 2 // 匹配类型
};

export default class FlatListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            loading: true,
            refreshing: false,
            isFooterLoading: false,
            dataArray: [],
            totalList: [],
            isRequest: true,
            searchItems: props.searchItems
        }
    }

    componentWillUnmount(): void {
        this.lister.remove()
    }

    componentDidMount(): void {
        this.lister = DeviceEventEmitter.addListener('refresh', () => this.fetch());
        this.fetch()
    }

    //Android进行创建时间日期选择器
    async showPicker(options, index) {
        try {
            const option = {date: options.date};
            if (options.minDate) {
                option.minDate = options.minDate
            }
            if (options.maxDate) {
                option.maxDate = options.maxDate
            }
            const {action, year, month, day} = await DatePickerAndroid.open(option);
            const searchItems = this.state.searchItems;
            if (action !== DatePickerAndroid.dismissedAction) {
                searchItems[index].value = new Date(year, month, day);
                this.setState({searchItems, loading: true}, () => this.fetch())
            }
        } catch ({code, message}) {
            console.warn(`Error in example : `, message)
        }
    }

    //IOS进行创建时间日期选择器
    showDatePicker = (isMax) => {
        this.setState({type: isMax ? 'max' : 'min'}, () => this.setState({showSelect: true}))
    };

    fetch = () => {
        const {data} = this.props;
        const {searchItems} = this.state;
        if (data.url) {
            let requestUrl = data.url;
            searchItems.forEach(item => {
                if (item.type === searchType.RequestParameters) {
                    requestUrl += `${requestUrl.indexOf('?') === -1 ? '?' : '&'}${item.parameter}=${getDateText(item.value || item.default)}`
                }
            });
            requestWithToken({
                url: requestUrl,
                method: 'GET'
            }).then((data) => {
                console.log('列表获取成功：' + JSON.stringify(data));
                if (this.props.resultKey) {
                    this.setState({
                        dataArray: data.result[this.props.resultKey],
                        totalList: data.result[this.props.resultKey]
                    })
                } else {
                    this.setState({dataArray: data.result, totalList: data.result})
                }
            }).catch(err => {
                console.log('列表获取失败：', err.message || err)
            }).finally(() => this.setState({refreshing: false, loading: false}))
        } else {
            this.setState({dataArray: data, totalList: data, isRequest: false, refreshing: false, loading: false})
        }
    };

    _renderItem(item, index) {
        const {searchItems} = this.state;
        return (
            <View style={{
                marginTop: index === 0 && searchItems.length !== 0 ? 60 : 0,
                height: this.props.itemHeight || 'auto'
            }}>
                {this.props.renderItem(searchItems, item)}
            </View>
        )
    }

    loadData() {
        this.setState({refreshing: true, loading: true}, () => this.fetch())
    }

    _onEndReached() {
        this.setState({isFooterLoading: true});
        setTimeout(() => this.setState({isFooterLoading: false}), 500)
    }

    genIndicator() {
        return (
            this.state.dataArray.length !== 0 ?
                <View style={{height: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <ActivityIndicator animating={this.state.isFooterLoading}/>
                    <Text>{this.state.isFooterLoading ? '加载更多...' : '已到底'}</Text>
                </View> :
                null
        )
    }

    onScroll = (e) => {
        let offsetY = e.nativeEvent.contentOffset.y;
        if (offsetY < 10) {
            this.setState({opacity: 1})
        } else if (offsetY <= 180 && offsetY >= 10) {
            this.setState({opacity: 1 - (offsetY / 180)})
        } else {
            this.setState({opacity: 0})
        }
    };

    showTypePicker = (index) => {
        const searchItems = this.state.searchItems;
        Picker.init({
            pickerData: searchItems[index].searchTypeList.map(item => item.title),
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择类型',
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                searchItems[index].value = pickedIndex[0];
                const dataArray = [];
                this.state.totalList.forEach(item => {
                    if (item[searchItems[index].parameter] === searchItems[index].searchTypeList[pickedIndex[0]].key) {
                        dataArray.push(item)
                    }
                });
                this.setState({searchItems, dataArray})
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

    onChangeText = (value, index) => {
        const searchItems = this.state.searchItems;
        searchItems[index].value = value;
        this.setState({
            searchItems,
            dataArray: searchTextOfArray(this.state.totalList, this.state.searchItems[index].parameter, value)
        })
    };

    render() {
        const {searchItems, opacity, dataArray} = this.state;
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.loading} textContent={`加载中...`} textStyle={{color: '#fff'}}/>
                {searchItems.length !== 0 && opacity ?
                    <View style={[{
                        width: width,
                        height: 45,
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 0,
                        zIndex: 9
                    }, !this.props.isNoBack && {
                        backgroundColor: `rgba(255,255,255,${opacity})`,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: `rgba(229,229,229,${opacity})`
                    }]}>
                        {searchItems.map((item, index) => {
                                switch (item.type) {
                                    case 0:
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={{
                                                    flex: item.flex,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onPress={Platform.OS === 'android' ?
                                                    this.showPicker.bind(this, !isNaN(item.limit) ? {
                                                        date: item.value || item.default,
                                                        minDate: item.parameter === 'endDate' ?
                                                            (searchItems[index - 1].parameter === 'startDate' ?
                                                                (searchItems[index - 1].value || searchItems[index - 1].default) :
                                                                (item.limit === null ? null : getFewDaysAfter(new Date(), item.limit))) :
                                                            (item.limit === null ? null : getFewDaysAfter(new Date(), item.limit)),
                                                        maxDate: item.parameter === 'endDate' ?
                                                            (item.limit === null ? null : getFewDaysAfter(new Date(), item.limit)) :
                                                            (searchItems[index + 1].parameter === 'endDate' ?
                                                                (searchItems[index + 1].value || searchItems[index + 1].default) :
                                                                (item.limit === null ? null : getFewDaysAfter(new Date(), item.limit)))
                                                    } : {
                                                        date: item.value || item.default,
                                                        minDate: item.limit && item.limit.length ? item.limit[0] === null ? null : getFewDaysAfter(new Date(), item.limit[0]) : null,
                                                        maxDate: item.limit && item.limit.length ? item.limit[1] === null ? null : getFewDaysAfter(new Date(), item.limit[1]) : null
                                                    }, index) :
                                                    () => this.showDatePicker()
                                                }
                                            >
                                                {item.parameter === 'startDate' && searchItems[index + 1].parameter === 'endDate' ?
                                                    <Text style={{
                                                        flex: 1,
                                                        textAlign: 'center',
                                                        color: `rgba(51,51,51,${opacity})`
                                                    }}>
                                                        日期：
                                                    </Text> : (item.parameter === 'endDate' && searchItems[index - 1].parameter === 'startDate' ?
                                                        <Text style={{
                                                            flex: 1,
                                                            textAlign: 'center',
                                                            color: `rgba(102,102,102,${opacity})`
                                                        }}>
                                                            {` ~ `}
                                                        </Text> : null)}
                                                <Text style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    fontSize: 14,
                                                    color: `rgba(87,199,247,${opacity})`
                                                }}>
                                                    {getDateText(item.value || item.default, true)}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    case 1:
                                        return (
                                            <View style={{flex: item.flex, alignItems: 'center', justifyContent: 'center'}}>
                                                <TextInput
                                                    ref='search'
                                                    underlineColorAndroid='transparent'
                                                    blurOnSubmit={true}
                                                    style={{
                                                        height: '60%',
                                                        width: '90%',
                                                        borderRadius: 8,
                                                        backgroundColor: `rgba(255,255,255,${opacity})`,
                                                        textAlign: 'center',
                                                        paddingVertical: 2
                                                    }}
                                                    placeholder='请输入'
                                                    placeholderTextColor={`rgba(102,102,102,${opacity})`}
                                                    selectTextOnFocus={true}
                                                    onChangeText={(value) => this.onChangeText(value, index)}
                                                />
                                            </View>
                                        );
                                    case 2:
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    flex: item.flex,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onPress={() => this.showTypePicker(index)}
                                            >
                                                <Text style={{fontSize: 14, color: `rgba(87,199,247,${opacity})`}}>
                                                    {item.searchTypeList[item.value || item.searchTypeList.map(typeItem => typeItem.key).indexOf(item.default)].title}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    default:
                                        return (
                                            <View style={{flex: item.flex}}>
                                            </View>
                                        )
                                }
                            }
                        )}
                    </View> :
                    null
                }
                <FlatList
                    ref={(view) => {
                        this.myFlatList = view
                    }}
                    data={dataArray}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    onScroll={(e) => this.onScroll(e)} //FlatList的文档中没有onScroll事件监听。但是ScrollView与FlatList是父子关系，看ScrollView的API说明
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.state.isRequest ? this.loadData() : {}}
                    ListFooterComponent={() => dataArray.length === 0 ? null : this.genIndicator()}
                    onEndReached={() => this._onEndReached()}
                    ListEmptyComponent={() => <NullDateView style={{marginTop: 80}}/>}
                    getItemLayout={(data, index) => (
                        {
                            length: this.props.itemHeight,
                            offset: this.props.itemHeight * index + (searchItems.length !== 0 ? 50 : 0),
                            index
                        }
                    )}
                />
                <TouchableOpacity
                    style={{
                        width: 30 * (1 - opacity),
                        height: 30 * (1 - opacity),
                        position: 'absolute',
                        right: 10,
                        bottom: 20 * (1 - opacity),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15 * (1 - opacity),
                        borderWidth: 1 - opacity,
                        borderColor: '#aaa'
                    }}
                    onPress={() => this.myFlatList.scrollToIndex({
                        viewPosition: 0,
                        index: 0,
                        viewOffset: searchItems.length !== 0 ? 50 : 0
                    })}
                >
                    <Image style={{width: 20 * (1 - opacity), height: 20 * (1 - opacity)}}
                           source={require('./images/icons/top.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}
