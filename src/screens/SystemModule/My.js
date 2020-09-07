import React, {Component} from 'react';
import {DeviceEventEmitter, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {storage} from '../../utils/storage';
import Picker from "react-native-picker/index";

export default class My extends Component {
    state = {
        userId: null,
        userName: '-',
        userType: '',
        deptName: '-',
        roles: [],
        photo: 'http://www.yuntsoft.com:7389/group1/M00/00/57/rBDZElxFo9OAWEeoAAAch4EFFiQ651.png',
        loading: false,
        sex: 0,
        phone: '',
        password: ''
    };

    componentDidMount() {
        this.lister = DeviceEventEmitter.addListener('changePhoto', (value) => {
            this.setState({photo: value})
        });
        storage.load({
            key: 'loginInfo',
            syncInBackground: true
        }).then(ret => {
            storage.load({
                key: 'nowRole',
                syncInBackground: true
            }).then(ret2 => {
                this.setState({
                    userId: ret.userId,
                    userName: ret.name,
                    deptName: ret.city,
                    roles: ret.roles,
                    sex: ret.sex,
                    password: ret.password,
                    phone: ret.phone,
                    photo: ret.photo ? ret.photo : (ret.sex === 0 ? 'http://www.yuntsoft.com:7389/group1/M00/00/57/rBDZElxFo9OAWEeoAAAch4EFFiQ651.png' : 'http://www.yuntsoft.com:7389/group1/M00/00/57/rBDZElxFo7yALB0eAAAadU92bPo338.png'),
                    userType: ret2.roleSign
                });
            }).catch(err => {
                console.log('err:' + err)
            });
        }).catch(err => {
            console.log('err:' + err)
        })
    }

    showRolesPicker = () => {
        Picker.init({
            pickerData: this.state.roles.map(item => item.roleName),
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择类型',
            pickerFontColor: [0, 0, 0, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                saveNowRole({
                    roleSign: this.state.roles[pickedIndex[0]].roleSign
                });
                this.props.navigation.navigate('Login')
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show()
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#51CFB2'
            }}>
                <ImageBackground source={require('../../components/images/background/myBackGround.png')} style={{flex: 1}}>
                    <View style={{flex: 3, flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 35}}>
                        <View style={{flex: 2, justifyContent: 'center'}}>
                            <Text style={{flex: 3, fontSize: 18, color: '#fff'}}>{this.state.userName}</Text>
                            <Text style={{flex: 2, fontSize: 14, color: '#fff'}}>{this.state.deptName}</Text>
                            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 14, color: '#fff'}}>
                                    {this.state.roles.filter(item => item.roleSign === this.state.userType).length > 0 && this.state.roles.filter(item => item.roleSign === this.state.userType)[0].roleName || ''}
                                </Text>
                                {this.state.roles.length > 1 &&
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}
                                    onPress={() => this.showRolesPicker()}
                                >
                                    <Image
                                        style={{width: 15, height: 15}}
                                        source={require('../../components/images/icons/refresh.png')}/>
                                    <Text>切换</Text>
                                </TouchableOpacity>}
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 3}}>
                                <View style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 35,
                                    borderWidth: 2,
                                    borderColor: '#fff'
                                }}>
                                    <Image
                                        style={{width: 66, height: 66, borderRadius: 33}}
                                        source={{uri: this.state.photo}}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 1}}>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 6,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: '#fff',
                        paddingHorizontal: 15,
                        paddingVertical: 30
                    }}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.navigation.navigate('MyDetail', {
                                        detail: {
                                            userId: this.state.userId,
                                            photo: this.state.photo,
                                            name: this.state.userName,
                                            sex: this.state.sex,
                                            roles: this.state.roles,
                                            phone: this.state.phone
                                        }
                                    })
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{marginLeft: 16}}
                                        source={require('../../components/images/icons/zhanghuxinxi.png')}/>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 20
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            color: '#141414',
                                            fontSize: 16,
                                            marginLeft: 5
                                        }}>账户信息</Text>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            marginRight: 20,
                                            fontSize: 16
                                        }}>{'>'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.navigation.navigate('Update')
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{marginLeft: 16}}
                                        source={require('../../components/images/icons/banbengengxin.png')}/>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 20
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            color: '#141414',
                                            fontSize: 16,
                                            marginLeft: 5
                                        }}>版本更新</Text>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            marginRight: 20,
                                            fontSize: 16
                                        }}>{'>'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.navigation.navigate('Feedback', {
                                        detail: {
                                            userId: this.state.userId,
                                            password: this.state.password
                                        }
                                    })
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{marginLeft: 16}}
                                        source={require('../../components/images/icons/wentifankui.png')}/>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 20
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            color: '#141414',
                                            fontSize: 16,
                                            marginLeft: 5
                                        }}>问题反馈</Text>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            marginRight: 20,
                                            fontSize: 16
                                        }}>{'>'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => {
                                    this.props.navigation.navigate('Setting', {
                                        detail: {
                                            userId: this.state.userId,
                                            password: this.state.password
                                        }
                                    })
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{marginLeft: 16}}
                                        source={require('../../components/images/icons/shezhi.png')}/>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 20
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            color: '#141414',
                                            fontSize: 16,
                                            marginLeft: 5
                                        }}>设置</Text>
                                    </View>
                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            textAlign: 'right',
                                            marginRight: 20,
                                            fontSize: 16
                                        }}>{'>'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
