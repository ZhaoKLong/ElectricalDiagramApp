import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native'
import {commonStyles} from "../../utils/commonStyle";
import FlatListComponent, {searchType} from "../../components/FlatListComponent";

export default class FlatListTest extends Component {
    render() {
        return (
            <View style={commonStyles.container}>
                <FlatListComponent
                    data={{url: '/app/purchase/search'}} //列表数据来源{url:***}或者ArrayList
                    searchItems={[ //查询字段
                        {
                            flex: 1, // 横向flex布局
                            type: searchType.RequestParameters, // 类型：详情见FlatListComponent组件内的searchType
                            parameter: 'startDate', // 字段
                            default: new Date(), // 默认值
                            limit: null // 日期范围（仅type: searchType.RequestParameters时可用,startDate和endDate用单个数字表示，其余日期用[start(num),end(num)]表示）
                        },
                        {
                            flex: 1,
                            type: searchType.RequestParameters,
                            parameter: 'endDate',
                            default: new Date(),
                            limit: null
                        },
                        // {
                        //     flex: 1,
                        //     type: searchType.RequestParameters,
                        //     parameter: 'startDate',
                        //     default: new Date(),
                        //     limit: [null, 0]
                        // },
                        {
                            flex: 2,
                            type: searchType.QueryText,
                            parameter: 'deptName',
                            default: ''
                        },
                        // {
                        //     flex: 1,
                        //     type: searchType.QueryType,
                        //     parameter: 'deptId',
                        //     default: 368,
                        //     searchTypeList: [{key: 368, title: '测试1'}, {key: 369, title: '测试2'}]
                        // }
                    ]}
                    renderItem={(searchItems, item) => // item样式
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                marginHorizontal: 10,
                                marginVertical: 5,
                                borderRadius: 5
                            }}
                            onPress={() => console.log(item)}
                        >
                            <View style={{flex: 2, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.purchaseName}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={commonStyles.titleText}>进货时间</Text>
                                <Text style={commonStyles.valueText}>{item.purchaseDate || '-'}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={commonStyles.titleText}>供货单位</Text>
                                <Text style={commonStyles.valueText}>{item.supplierName || '-'}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={commonStyles.titleText}>进货部门</Text>
                                <Text style={commonStyles.valueText}>{item.deptName || '-'}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    itemHeight={120} // item高度
                />
            </View>
        )
    }
}