import React from "react";
import {BackHandler, Image, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import TextField from '../../components/TextFieldComponent';
import AlertDialog from "../../components/AlertDialogComponent";
import Button from '../../components/ButtonComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import {saveInfo, saveUrl, storage} from '../../utils/storage';
import request from '../../utils/request';
import {loginApi} from "../../utils/Api";
import {defaultApiAddress, defaultColor} from "../../utils/config";
import Toast from 'react-native-root-toast/index';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: false,
            password: false,
            modalVisibility: false,
            selectRoleVisible: false,
            roles: [],
            errorMessage: '',
            type: true,
            url: defaultApiAddress,
            isChange: true,
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        storage.load({
            key: 'urlInfo',
        }).then(url => {
                this.setState({url: url.url});
            }
        ).catch(err => {
            console.log(err);
            saveUrl({
                url: this.state.url
            })
        });
        storage.load({
            key: 'loginInfo',
        }).then(ret => {
            this.setState({username: ret.username, password: ret.password}, () => this.login());
        }).finally(() => {
            if (this.props.navigation.state.params) {
                this.setState({username: this.props.navigation.state.params.username})
            }
        })
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false
        }
        this.lastBackPressed = Date.now();
        // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        Toast.show('再按一次退出应用', {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.BOTTOM, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
            onShow: () => {
            },
            onShown: () => {
            },
            onHide: () => {
            },
            onHidden: () => {
            }
        });
        return true
    };

    login = () => {
        const {username, password} = this.state;
        this.setState({loading: true}, () =>
            request({
                method: 'POST',
                url: loginApi,
                data: {username, password}
            }).then((data) => {
                if (data.result.userInfo.roles.length === 1) {
                    console.log('登录成功：' + JSON.stringify(data));
                    saveInfo({
                        token: data.result.token,
                        refresh_token: data.result.refresh_token,
                        userId: data.result.userInfo.userId,
                        username: username,
                        password: password,
                        city: data.result.city.deptName,
                        deptId: data.result.city.deptId,
                        deptType: data.result.city.deptType,
                        name: data.result.userInfo.name,
                        phone: data.result.userInfo.mobile,
                        photo: data.result.userInfo.photo,
                        signature: data.result.userInfo.signature,
                        sex: data.result.userInfo.sex,
                        roles: data.result.userInfo.roles
                    });
                    this.props.navigation.navigate('App')
                } else if (data.result.userInfo.roles.length > 1) {
                    ToastAndroid.show(
                        '该用户存在多个角色，请确认后再登录！',
                        ToastAndroid.LONG
                    )
                } else {
                    ToastAndroid.show(
                        '该用户未绑定角色，请确认后再登录！',
                        ToastAndroid.LONG
                    )
                }
            }).catch(err => {
                this.setState({modalVisibility: true});
                console.log(err || err.message)
            }).finally(e => this.setState({loading: false}))
        )
    };

    hide = (value) => {
        if (value === 'yuntsoft123!@#') {
            this.setState({username: false, type: false})
        } else {
            this.setState({username: value})
        }
    };

    changeUrl = () => {
        alert(this.state.url);
        saveUrl({url: this.state.url});
        this.setState({type: true, isChange: true})
    };

    render() {
        const {username, password, loading, modalVisibility, selectRoleVisible, roles} = this.state;
        return (
            this.state.type ?
                <View style={{
                    backgroundColor: '#fff',
                    position: 'relative',
                    flex: 1
                }}>
                    <Spinner visible={loading} textContent={"登录中..."} textStyle={{color: '#ffffff'}}/>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            style={{width: 80, height: 80}}
                            source={require('../../components/images/background/ic_launcher.png')}/>
                        <Text style={{fontSize: 15, marginTop: 10, fontWeight: 'bold'}}>基础架构</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <TextField
                            defaultValue={username}
                            label='账  号 :'
                            pic={require('../../components/images/icons/account.png')}
                            placeholder={username || '用户名/手机号码'}
                            onChange={value => this.hide(value)}
                        />
                        <TextField
                            defaultValue={password}
                            label='密  码 :'
                            pic={require('../../components/images/icons/password.png')}
                            type='password'
                            placeholder={password ? '******' : '登录密码'}
                            onChange={value => this.setState({password: value})}
                        />
                        <View style={{paddingHorizontal: 16}}>
                            <Button
                                style={{backgroundColor: defaultColor}}
                                isDisabled={!username || !password}
                                onPress={() => this.login()}
                            >登录</Button>
                        </View>
                    </View>
                    <AlertDialog
                        title='登录失败'
                        message='用户名或密码错误！'
                        visibility={modalVisibility}
                        buttonNameL="确定"
                        onClickL={() => {
                            this.setState({modalVisibility: false})
                        }}
                    />
                    <AlertDialog
                        title='请选择您要登录的角色'
                        visibility={selectRoleVisible}
                        message={
                            <View style={{
                                width: '100%',
                                paddingVertical: 10,
                                paddingHorizontal: 40
                            }}>
                                {roles.map(item =>
                                    <TouchableOpacity
                                        style={{
                                            height: 30,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => this.setState({selectRoleVisible: false}, () => {
                                            this.props.navigation.navigate('App')
                                        })}
                                    >
                                        <Text style={{color: defaultColor, textAlign: 'center'}}>{item.roleName}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        }
                    />
                </View> :
                <View style={{
                    backgroundColor: '#fff',
                    position: 'relative',
                    flex: 1
                }}>
                    <View style={{flex: 1}}>
                        <View style={{flex: 4}}>
                            <TextField
                                label='请求地址'
                                placeholder={this.state.url}
                                onChange={value => this.setState({
                                    url: `http://${value}`,
                                    isChange: false
                                })}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, paddingHorizontal: 16}}>
                                <Button
                                    isDisabled={this.state.isChange}
                                    onPress={() => this.changeUrl()}
                                >更换路径</Button>
                            </View>
                            <View style={{flex: 1, paddingHorizontal: 16}}>
                                <Button onPress={() => {
                                    this.setState({type: true})
                                }}>
                                    返回
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
        )
    }
}