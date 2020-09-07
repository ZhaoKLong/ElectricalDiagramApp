import React from 'react';
import {Animated, Dimensions, PermissionsAndroid, ToastAndroid} from 'react-native';
import {isOpenLocationService} from "../utils/Location";

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('./images/background/app.jpg');

export default class SplashComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start()
    }

    componentWillMount() {
        this.requestLocationPermission()
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    //第一次请求拒绝后提示用户你为什么要这个权限
                    'title': '我要地址查询权限',
                    'message': '没有权限无法获取您当前位置，如继续使用请同意'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                isOpenLocationService((error, volume) => {
                    if (!volume) {
                        ToastAndroid.show("请前往设备的“设置”里，开启“位置信息”功能，以便于更好地给您提供服务！", ToastAndroid.LONG)
                    }
                });
                this.timer = setTimeout(() => {
                    this.props.navigation.navigate('Login')
                }, 1000)
            } else {
                ToastAndroid.show("获取地址查询失败", ToastAndroid.SHORT)
            }
        } catch (err) {
            ToastAndroid.show(err.toString(), ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: maxWidth,
                    height: maxHeight,
                    transform: [{scale: this.state.bounceValue}]
                }}
                source={splashImg}
            />
        )
    }
}
