import React, {Component} from 'react';
import {View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import FormComponent, {formType} from '../../components/FormComponent'

export default class FormTest extends Component {
    submit = (formResult) => {
        console.log(formResult)
    };

    render() {
        const form = [
            {
                label: '测试字符',
                key: 'text',
                required: true,
                type: formType.text
            },
            {
                label: '测试数字',
                key: 'num',
                required: true,
                type: formType.num,
                height: 50
            },
            {
                label: '测试单个日期',
                key: 'date',
                required: true,
                type: formType.date,
                limit: [-3, 4],
                height: 60
            },
            {
                label: '测试日期范围',
                key: 'dateRange',
                required: true,
                type: formType.dateRange,
                limit: [-5, 8],
                height: 70
            },
            {
                label: '测试列表选择',
                key: 'select',
                required: true,
                type: formType.select,
                selectList: [{title: '测试1', value: 'test1'}, {title: '测试2', value: 'test2'}],
                title: 'title',
                value: 'value',
                height: 80
            },
            {
                label: '测试单选',
                key: 'radio',
                required: true,
                type: formType.radio,
                selectList: [{title: '测试1', value: 'test1'}, {title: '测试2', value: 'test2'}, {title: '测试3', value: 'test3'}, {title: '测试4', value: 'test4'}, {title: '测试5', value: 'test5'}, {title: '测试6', value: 'test6'}],
                title: 'title',
                value: 'value',
                lineHeight: 50
            },
            {
                label: '测试多选',
                key: 'checkBox',
                required: true,
                type: formType.checkBox,
                selectList: [{title: '测试1', value: 'test1'}, {title: '测试2', value: 'test2'}, {title: '测试3', value: 'test3'}, {title: '测试4', value: 'test4'}, {title: '测试5', value: 'test5'}, {title: '测试6', value: 'test6'}],
                title: 'title',
                value: 'value',
                lineHeight: 60
            }
        ];
        return (
            <View style={commonStyles.container}>
                <FormComponent
                    form={form}
                    submit={this.submit}
                    submitText='测试提交'
                />
            </View>
        )
    }
}
