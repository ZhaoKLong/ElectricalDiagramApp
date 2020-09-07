import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import DescriptionsComponent from '../../components/DescriptionsComponent'

export default class DescriptionsTest extends Component {
    render() {
        const source = [
            {
                title: '姓名',
                key: '测试',
                icon: <Image source={require('../../components/images/icons/zhanghuxinxi.png')}/>
            },
            {
                title: '性别',
                key: '男'
            }
        ];
        const source2 = [
            {
                title: '年龄',
                key: 'age',
                icon: <Image source={require('../../components/images/icons/zhanghuxinxi.png')}/>
            },
            {
                title: '联系方式',
                key: 'phone'
            },
            {
                title: '未找到对应值',
                key: 'a'
            }
        ];
        const json = {age: 20, phone: 12345678910};
        return (
            <View style={commonStyles.container}>
                <DescriptionsComponent
                    source={source}
                />
                <DescriptionsComponent
                    source={source2}
                    json={json}
                />
            </View>
        )
    }
}
