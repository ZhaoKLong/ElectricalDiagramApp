import React, {Component} from 'react';
import {DeviceEventEmitter, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Button from '../../components/ButtonComponent';
import AlertDialog from "../../components/AlertDialogComponent";
import {requestUrl} from "../../utils/request";
import Picker from "react-native-picker/index";
import {storage} from "../../utils/storage";
import {versionApiAddress} from "../../utils/config";

export default class Feedback extends Component {
    state = {
        modalVisibility: false,
        input: true,
        message: '',
        typeIndex: 0,
        deptName: '',
        userName: '',
        phone: ''
    };

    componentWillMount() {
        DeviceEventEmitter.emit('remove');
    }

    componentWillUnmount() {
        DeviceEventEmitter.emit('Listener');
    }

    componentDidMount(): void {
        storage.load({
            key: 'loginInfo',
            syncInBackground: true
        }).then(ret => {
            this.setState({deptName: ret.city, userName: ret.name, phone: ret.phone})
        }).catch(err =>
            console.log(err || err.message)
        )
    }

    onSubmit = () => {
        requestUrl({
            method: 'POST',
            // url: `http://softmanage.yuntsoft.com:7355/feedback`,
            url: `${versionApiAddress}/feedback`,
            data: {
                feedbackContent: this.state.message,
                deptName: this.state.deptName,
                userName: this.state.userName,
                feedbackType: '' + this.state.typeIndex,
                productId: 3,
                mobile: this.state.phone
            }
        }).then(response => {
            this.setState({modalVisibility: true})
        }).then(responseData => {
        }).catch((err) => {
            console.log(err || err.message)
        })
    };

    showTypePicker() {
        Picker.init({
            pickerData: ['软件问题/建议（程序）', '硬件问题/建议（设备）'],
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择类型',
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                this.setState({typeIndex: pickedIndex[0]});
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    };

    render() {
        return (
            <View style={{paddingHorizontal: 16}}>
                <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{flex: 1, textAlign: 'center'}}>反馈类型：</Text>
                    <TouchableOpacity style={{flex: 3, height: '100%', justifyContent: 'center'}}
                                      onPress={() => this.showTypePicker()}>
                        <Text style={{color: '#03c4ff'}}>{['软件问题/建议', '硬件问题/建议'][this.state.typeIndex]}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{width: '100%', fontSize: 16}}
                    keyboardType={'default'}
                    placeholder='请输入意见或建议'
                    onChangeText={(value) => {
                        this.setState({message: value, input: false});
                    }}
                    multiline={true}
                    numberOfLines={5}
                />
                <Button isDisabled={this.state.input} onPress={() => this.onSubmit()}>
                    {this.state.input ?
                        '请输入后提交' : '提交反馈'}
                </Button>
                <AlertDialog title='意见反馈' message='反馈成功！' visibility={this.state.modalVisibility} buttonNameL="确定"
                             onClickL={() => {
                                 this.setState({modalVisibility: false});
                                 this.props.navigation.goBack()
                             }}
                />
            </View>
        )
    }
}