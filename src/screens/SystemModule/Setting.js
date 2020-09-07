import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import AlertDialog from "../../components/AlertDialogComponent";
import {requestWithToken} from "../../utils/request";
import {removeNowRole, removeUser, saveInfo, storage} from "../../utils/storage";
import Button from "../../components/ButtonComponent";
import Orientation from 'react-native-orientation';
import SignatureCapture from "react-native-signature-capture";
import {createSignatureImageApi, restPasswordApi} from "../../utils/Api";

export default class Setting extends Component {
    state = {
        versionVisible: false,
        passwordVisible: false,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        newPassword: '',
        visible: false,
        signature: '',
        img: ''
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
            this.setState({signature: ret.signature || ''})
        }).catch(err => {
            console.log(err)
        })
    }

    changePassword = () => {
        if (this.state.newPassword === '' || this.state.newPassword === null) {
            ToastAndroid.show(
                '密码不能为空！',
                ToastAndroid.SHORT
            );
        } else {
            requestWithToken({
                url: restPasswordApi,
                method: 'POST',
                data: {
                    userId: this.props.navigation.state.params.detail.userId,
                    password: this.props.navigation.state.params.detail.password,
                    newPassword: this.state.newPassword
                }
            }).then((data) => {
                console.log('密码修改成功：' + JSON.stringify(data));
                ToastAndroid.show(
                    '修改成功！',
                    ToastAndroid.SHORT
                );
                this.setState({passwordVisible: false});
                this.logout()
            }).catch(err => {
                console.log('密码修改失败：' + JSON.stringify(err) || JSON.stringify(err.message));
                ToastAndroid.show(
                    '修改失败！',
                    ToastAndroid.SHORT
                );
            })
        }
    };

    logout = () => {
        storage.load({
            key: 'loginInfo',
            syncInBackground: true
        }).then(ret => {
            this.props.navigation.navigate('Login', {username: ret.username})
        }).catch(e =>
            this.props.navigation.navigate('Login')
        );
        removeUser();
        removeNowRole()
    };

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent = (result) => {
        const data = {
            width: 156,
            height: 64,
            base64: 'data:image/png;base64,' + result.encoded
        };
        requestWithToken({
            url: createSignatureImageApi,
            method: 'POST',
            data: data
        }).then((data) => {
            console.log('提交成功：' + JSON.stringify(data));
            if (data.resultCode === 0)
                storage.load({
                    key: 'loginInfo',
                    syncInBackground: true
                }).then(ret => {
                    this.setState({signature: data.result});
                    saveInfo({
                        token: ret.token,
                        refresh_token: ret.refresh_token,
                        userId: ret.userId,
                        username: ret.username,
                        password: ret.password,
                        userType: ret.userType,
                        city: ret.city,
                        deptId: ret.deptId,
                        name: ret.name,
                        phone: ret.phone,
                        photo: ret.photo,
                        signature: data.result,
                        sex: ret.sex
                    });
                }).catch(err => {
                    console.log(err)
                });
            this.setState({visible: false}, () => Orientation.lockToPortrait())
        }).catch(err => {
            console.log('提交失败：', err.message || err);
            this.setState({disable: false});
            ToastAndroid.show(
                '提交失败！请重新提交...',
                ToastAndroid.SHORT
            );
        });
    };

    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 4}}>
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: '#fff'}}
                        onPress={() => {
                            this.props.navigation.navigate('SystemConfig')
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#cdcdcd',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}>
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
                                }}>操作习惯</Text>
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
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: '#fff'}}
                        onPress={() => {
                            this.props.navigation.navigate('AboutUs', {url: 'http://www.yuntsoft.com:7389/group1/M00/00/57/rBDZElxFgu2ASSz9AC-7lYdCXP4005.pdf'})
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#cdcdcd',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}>
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
                                }}>关于我们</Text>
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
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: '#fff'}}
                        onPress={() => {
                            this.setState({versionVisible: true})
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#cdcdcd',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}>
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
                                }}>版本信息</Text>
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
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: '#fff'}}
                        onPress={() => {
                            this.setState({passwordVisible: true})
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#cdcdcd',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}>
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
                                }}>修改密码</Text>
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
                    {/*<TouchableOpacity*/}
                    {/*    style={{flex: 1}}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({visible: true})*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <View style={{*/}
                    {/*        flex: 1,*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        alignItems: 'center',*/}
                    {/*        borderBottomColor: '#cdcdcd',*/}
                    {/*        borderBottomWidth: StyleSheet.hairlineWidth*/}
                    {/*    }}>*/}
                    {/*        <View style={{*/}
                    {/*            flex: 1,*/}
                    {/*            flexDirection: 'row',*/}
                    {/*            alignItems: 'center',*/}
                    {/*            marginLeft: 20*/}
                    {/*        }}>*/}
                    {/*            <Text style={{*/}
                    {/*                flex: 1,*/}
                    {/*                color: '#141414',*/}
                    {/*                fontSize: 16,*/}
                    {/*                marginLeft: 5*/}
                    {/*            }}>留样签名</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}
                    {/*            <Image*/}
                    {/*                style={{width: 100, height: 40}}*/}
                    {/*                source={{uri: this.state.signature}}/>*/}
                    {/*        </View>*/}
                    {/*        <View style={{*/}
                    {/*            flex: 1,*/}
                    {/*            flexDirection: 'row',*/}
                    {/*            justifyContent: 'flex-end'*/}
                    {/*        }}>*/}
                    {/*            <Text style={{*/}
                    {/*                flex: 1,*/}
                    {/*                textAlign: 'right',*/}
                    {/*                marginRight: 20,*/}
                    {/*                fontSize: 16*/}
                    {/*            }}>{'修改 >'}</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={{flex: 3}}>
                    {/*<Image style={{width: '100%', height: '100%'}} source={{uri: this.state.img}}/>*/}
                </View>
                <View style={{flex: 2, padding: 10}}>
                    <Button onPress={() => this.logout()}>退出登录</Button>
                </View>
                <AlertDialog visibility={this.state.versionVisible} title='版本信息' message='第一个版本' buttonNameL='确定'
                             onClickL={() => this.setState({versionVisible: false})}/>
                <AlertDialog
                    visibility={this.state.passwordVisible}
                    title='修改密码'
                    message={
                        <View style={{width: 200, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{flex: 1}}>新密码：</Text>
                            <View style={{flex: 2}}>
                                <TextInput
                                    placeholder='请输入新密码'
                                    secureTextEntry
                                    style={{width: '90%'}}
                                    value={this.state.newPassword}
                                    onChangeText={(value => this.setState({newPassword: value}))}
                                />
                            </View>
                        </View>
                    }
                    buttonNameL='确定'
                    buttonNameR='取消'
                    onClickL={() => {
                        this.changePassword()
                    }}
                    onClickR={() => this.setState({passwordVisible: false})}
                />
                {this.state.visible &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        this.setState({visible: false}, () => Orientation.lockToPortrait())
                    }}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: '#fff'
                    }}>
                        <SignatureCapture
                            style={[{flex: 3}, styles.signature]}
                            ref="sign"
                            onSaveEvent={(e) => this._onSaveEvent(e)}
                            onDragEvent={this._onDragEvent}
                            saveImageFileInExtStorage={false}
                            showNativeButtons={false}
                            showTitleLabel={false}
                            viewMode={"landscape"}
                        />
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.saveSign()
                                                }}>
                                <Text style={{color: '#fff'}}>保存</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.resetSign()
                                                }}>
                                <Text style={{color: '#fff'}}>清空</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonStyle}
                                                onPress={() => {
                                                    this.setState({visible: false}, () => Orientation.lockToPortrait())
                                                }}>
                                <Text style={{color: '#fff'}}>返回</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9'
    },
    signature: {
        flex: 3,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "#03a9f4",
        margin: 10,
        borderRadius: 5
    }
});
