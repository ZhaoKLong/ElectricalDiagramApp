import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ToastAndroid,
    BackHandler,
    DeviceEventEmitter,
    StyleSheet
} from 'react-native';
import {storage, removeFirstOpen} from '../../utils/storage';
import {requestUrl} from "../../utils/request";
import AlertDialog from "../../components/AlertDialogComponent";
import {getMac, getSN} from "../../utils/Mac";
import {versionApiAddress} from "../../utils/config";

class Update extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        modalVisibility: false,
        versionCode: '',
        mac: '',
        mustUpdate: false,
        shouldUpdate: false,
        updateErr: false,
        appUrl: '',
        errorMessage: '',
        update: false,
        updateLog: '',
        sn: ''
    };

    componentWillMount() {
        DeviceEventEmitter.emit('remove');
    }

    componentWillUnmount() {
        DeviceEventEmitter.emit('Listener');
    }

    componentDidMount() {
        getMac((error, volume) => {
            this.setState({mac: volume})
        });
        getSN((e, v) => {
            this.setState({sn: v})
        })
    }

    checkVersion = (response) => {
        if (response.msg === true) {
            if (response.upgrade) {
                this.setState({
                    appUrl: response.upgrade
                });
                if (response.force) {
                    this.setState({
                        mustUpdate: true
                    })
                } else {
                    this.setState({
                        shouldUpdate: true
                    })
                }
            } else {
                this.setState({
                    modalVisibility: true
                })
            }
        } else {
            this.setState({updateErr: true, errorMessage: response.msg})
        }
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <View style={{flex: 6, backgroundColor: '#fff'}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: '#cdcdcd',
                        borderBottomWidth: StyleSheet.hairlineWidth
                    }}>
                        {/*<Image*/}
                        {/*    style={{width: 20, height: 20, marginLeft: 16}}*/}
                        {/*    source={require('../../images/Android.png')}/>*/}
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
                            }}>软件版本</Text>
                        </View>
                        <View style={{
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}>
                            <Text style={{
                                flex: 1,
                                textAlign: 'right',
                                marginRight: 20,
                                fontSize: 16
                            }}>v{this.state.versionCode}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {
                            // RNAndroidAutoUpdate.getAppVersionCode((versionCode) => {
                            //     storage.load({
                            //         key: 'loginInfo',
                            //         syncInBackground: true
                            //     }).then(ret =>
                            //         requestUrl({
                            //             method: 'POST',
                            //             url: `${versionApiAddress}/apparatus/v1/start`,
                            //             // url: `http://192.168.1.197:8989/apparatus/v1/start`,
                            //             data: {
                            //                 appType: "2",
                            //                 apparatusMacid: this.state.mac,
                            //                 apparatusSnid: this.state.sn,
                            //                 userDeptName: ret.city,
                            //                 versionNumber: versionCode
                            //             }
                            //         }).then(response => {
                            //             console.log('response:' + JSON.stringify(response));
                            //             this.setState({updateLog: response.result.log});
                            //             this.checkVersion(response.result)
                            //         }).then(responseData => {
                            //             console.log('responseData:' + JSON.stringify(responseData))
                            //         }).catch((err) => {
                            //             ToastAndroid.show('系统错误，请联系管理员！', ToastAndroid.SHORT);
                            //             console.log('err:' + err)
                            //         })
                            //     ).catch(err => {
                            //         //如果没有找到数据且没有sync方法，
                            //         //或者有其他异常，则在catch中返回
                            //         alert(err)
                            //     });
                            // });
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomColor: '#cdcdcd',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }}>
                            {/*<Image*/}
                            {/*    style={{width: 20, height: 20, marginLeft: 16}}*/}
                            {/*    source={require('../../images/download.png')}/>*/}
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
                                }}>软件更新</Text>
                            </View>
                            <View style={{
                                flex: 2,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
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
                <View style={{flex: 29}}>
                </View>
                <AlertDialog title='软件更新' message='当前为最新版本！' visibility={this.state.modalVisibility}
                             buttonNameL="确定"
                             onClickL={() => {
                                 this.setState({modalVisibility: false})
                             }}
                />
                <AlertDialog title='新版本需强制更新' message={this.state.updateLog} visibility={this.state.mustUpdate}
                             buttonNameL={this.state.update ? "更新中,稍后" : "立即更新"}
                             onClickL={() => {
                                 // showProgress();
                                 if (!this.state.update) {
                                     this.setState({update: true});
                                     // RNAndroidAutoUpdate.goToDownloadApk(this.state.appUrl, '采样仪');
                                 }
                             }}
                             buttonNameR="暂不更新"
                             onClickR={() => {
                                 BackHandler.exitApp()
                             }}
                />
                <AlertDialog title='新版本无需强制更新' message={this.state.updateLog} visibility={this.state.shouldUpdate}
                             buttonNameL="后台更新"
                             onClickL={() => {
                                 // showProgress();
                                 // RNAndroidAutoUpdate.goToDownloadApk(this.state.appUrl, '采样仪');
                                 removeFirstOpen();
                                 this.setState({shouldUpdate: false})
                             }}
                             buttonNameR="暂不更新"
                             onClickR={() => {
                                 this.setState({shouldUpdate: false})
                             }}
                />
                <AlertDialog title='获取更新版本失败' message={this.state.errorMessage} visibility={this.state.updateErr}
                             buttonNameL="确定"
                             onClickL={() => {
                                 this.setState({updateErr: false})
                             }}
                />
            </View>
        )
    }
}

export default Update;
