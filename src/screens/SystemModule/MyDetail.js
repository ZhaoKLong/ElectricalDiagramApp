import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import {requestWithToken} from "../../utils/request";
import ImagePicker from "react-native-image-picker/index";
import {storage} from "../../utils/storage";
import Button from "../../components/ButtonComponent";
import {updateSysUserApi} from "../../utils/Api";

export default class MyDetail extends Component {
    state = {
        detail: this.props.navigation.state.params.detail,
        photo: this.props.navigation.state.params.detail.photo,
        oldPhoto: ''
    };

    componentWillMount() {
        DeviceEventEmitter.emit('remove');
    }

    componentWillUnmount() {
        DeviceEventEmitter.emit('Listener');
    }

    selectPhotoSample = () => {
        const options = {
            maxWidth: 500,
            maxHeight: 500,
            //底部弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            quality: 0.75,
            allowsEditing: true,
            noData: false
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({oldPhoto: this.state.photo});
                storage.load({
                    key: 'urlInfo',
                    syncInBackground: true
                }).then(ret => {
                        // 创建form表单
                        let body = new FormData();
                        body.append('file', {
                            // 设定上传的格式
                            type: 'image/jpeg',
                            // 通过react-native-image-picker获取的图片地址
                            uri: response.uri,
                            name: response.fileName,
                        });
                        // 开启XMLHttpRequest服务
                        let xhr = new XMLHttpRequest();
                        /** 上传到的地址 */
                            // let url;
                        let url = `${ret.url}/file`;
                        // 开启post上传
                        xhr.open('POST', url);
                        // 发送请求
                        xhr.send(body);
                        // 如果正在上传,返回上传进度
                        if (xhr.upload) {
                            xhr.upload.onprogress = (event) => {
                                if (event.lengthComputable) {
                                    let perent = (event.loaded / event.total).toFixed(2) * 100 + "%";
                                    // 打印上传进度
                                    console.log(perent);
                                }
                            }
                        }
                        // 上传过成功的返回
                        xhr.onload = () => {
                            // console.log(xhr.status);
                            // 状态码如果不等于200就代表错误
                            if (xhr.status !== 200) {
                                // alert('请求失败');
                                this.setState({visible: true});
                                console.log(xhr.responseText);
                                return;
                            }
                            if (!xhr.responseText) {
                                // alert('请求失败');
                                this.setState({visible: true});
                                console.log(xhr.responseText);
                                return;
                            }
                            // 服务器最后返回的数据
                            // ...通过返回数据做接下来的处理
                            this.setState({photo: JSON.parse(xhr.response).result})
                        };
                    }
                ).catch(err => {
                    console.log(err)
                });
            }
        });
    };

    upload = () => {
        this.setState({oldPhoto: ''});
        requestWithToken({
            method: 'PUT',
            url: updateSysUserApi,
            data: {
                userId: this.props.navigation.state.params.detail.userId,
                photo: this.state.photo
            }
        }).then((data) => {
            console.log('头像上传成功!', data);
            ToastAndroid.show(
                '更新成功！',
                ToastAndroid.SHORT
            );
            DeviceEventEmitter.emit('changePhoto', this.state.photo);
        }).catch(err => {
            console.log('头像上传失败,错误信息如下:', err.message || err);
            ToastAndroid.show(
                '更新失败！',
                ToastAndroid.SHORT
            );
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.line, {height: 80}]}>
                    <View style={styles.left}><Text>更新头像</Text></View>
                    <View style={styles.right}>
                        <TouchableOpacity onPress={() => this.selectPhotoSample()}>
                            <View style={[styles.avatar, styles.avatarContainer]}>
                                <Image style={styles.avatar} source={{uri: this.state.photo}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.oldPhoto === '' ?
                        <View/> :
                        <View style={{flex: 1, padding: 5}}>
                            <Button onPress={() => this.upload()}>确定</Button>
                        </View>
                    }
                    {this.state.oldPhoto === '' ?
                        <View/> :
                        <View style={{flex: 1, padding: 5}}>
                            <Button
                                onPress={() => this.setState({photo: this.state.oldPhoto}, () => this.setState({oldPhoto: ''}))}
                            >
                                返回
                            </Button>
                        </View>
                    }
                </View>
                <View style={styles.line}>
                    <View style={styles.left}><Text>用户名</Text></View>
                    <View style={styles.right}><Text>{this.state.detail.name || '-'}</Text></View>
                </View>
                <View style={styles.line}>
                    <View style={styles.left}><Text>性别</Text></View>
                    <View style={styles.right}><Text>{this.state.detail.sex === 0 ? '女' : '男'}</Text></View>
                </View>
                <View style={styles.line}>
                    <View style={styles.left}><Text>职务</Text></View>
                    <View style={styles.right}><Text>{this.state.detail.roles[0].roleName || '-'}</Text></View>
                </View>
                <View style={styles.line}>
                    <View style={styles.left}><Text>手机号</Text></View>
                    <View style={styles.right}><Text>{this.state.detail.phone || '-'}</Text></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9'
    },
    line: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#cdcdcd',
        paddingHorizontal: 30
    },
    left: {
        flex: 2,
        justifyContent: 'center'
    },
    right: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    avatarContainer: {
        borderStyle: 'dotted',
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatar: {
        borderRadius: 35,
        width: 70,
        height: 70
    }
});
