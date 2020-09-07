import React from 'react';
import {DeviceEventEmitter, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
    BottomTabBar,
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import Splash from "../components/SplashComponent";
import Login from "../screens/SystemModule/Login";
import App from "../screens/SystemModule/App";
import My from "../screens/SystemModule/My";
import MyDetail from "../screens/SystemModule/MyDetail";
import Setting from "../screens/SystemModule/Setting";
import AboutUs from "../screens/SystemModule/AboutUs";
import Update from "../screens/SystemModule/Update";
import SystemConfig from "../screens/SystemModule/SystemConfig";
import Feedback from "../screens/SystemModule/Feedback";
import 'react-native-gesture-handler';
import {defaultColor} from "./config";
import FlatListTest from "../screens/Test/FlatListTest";
import AlertDialogTest from "../screens/Test/AlertDialogTest";
import AnimatedSelectTest from "../screens/Test/AnimatedSelectTest";
import AnimatedViewTest from "../screens/Test/AnimatedViewTest";
import LookPhotoTest from "../screens/Test/LookPhotoTest";
import MessageDetailTest from "../screens/Test/MessageDetailTest";
import PDFViewTest from "../screens/Test/PDFViewTest";
import SelectTest from "../screens/Test/SelectTest";
import TimeCardTest from "../screens/Test/TimeCardTest";
import VideoTest from "../screens/Test/VideoTest";
import DescriptionsTest from "../screens/Test/DescriptionsTest";
import FormTest from "../screens/Test/FormTest";

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    return (
        <View>
            {routeName === '首页' ?
                <FontAwesome name={'home'} size={25} color={tintColor}/> :
                <FontAwesome name={'user'} size={25} color={tintColor}/>
            }
        </View>
    )
};

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

const homePage = {};
const myPage = {};

const routes = [
    {
        key: homePage,
        routeList: [
            // 首页
            [
                {
                    key: 'Home',
                    route: App,
                    title: '首页'
                }
            ],
            [
                {
                    key: 'FlatListTest',
                    route: FlatListTest,
                    title: '大量数据列表测试'
                },
                {
                    key: 'AlertDialogTest',
                    route: AlertDialogTest,
                    title: '确认框测试'
                },
                {
                    key: 'SystemConfig',
                    route: SystemConfig,
                    title: '系统配置'
                },
                {
                    key: 'AnimatedSelectTest',
                    route: AnimatedSelectTest,
                    title: '下拉选择框测试'
                },
                {
                    key: 'AnimatedViewTest',
                    route: AnimatedViewTest,
                    title: '点击动画测试'
                },
                {
                    key: 'LookPhotoTest',
                    route: LookPhotoTest,
                    title: '图片查看测试'
                },
                {
                    key: 'MessageDetailTest',
                    route: MessageDetailTest,
                    title: '富文本测试'
                },
                {
                    key: 'PDFViewTest',
                    route: PDFViewTest,
                    title: 'PDF文件测试'
                },
                {
                    key: 'SelectTest',
                    route: SelectTest,
                    title: '滚动多选框测试'
                },
                {
                    key: 'TimeCardTest',
                    route: TimeCardTest,
                    title: '动态时间展示测试'
                },
                {
                    key: 'VideoTest',
                    route: VideoTest,
                    title: '视频播放测试'
                },
                {
                    key: 'DescriptionsTest',
                    route: DescriptionsTest,
                    title: '描述列表测试'
                },
                {
                    key: 'FormTest',
                    route: FormTest,
                    title: '表单提交测试'
                },
            ]
        ]
    },
    {
        key: myPage,
        routeList: [
            [
                {
                    key: 'My',
                    route: My,
                    title: '我的'
                }
            ],
            [
                {
                    key: 'MyDetail',
                    route: MyDetail,
                    title: '账户信息'
                },
                {
                    key: 'Update',
                    route: Update,
                    title: '版本更新'
                },
                {
                    key: 'Feedback',
                    route: Feedback,
                    title: '意见反馈'
                },
                {
                    key: 'SettingPage',
                    route: Setting,
                    title: '设置'
                },
                {
                    key: 'SystemConfig',
                    route: SystemConfig,
                    title: '系统配置'
                },
                {
                    key: 'AboutUs',
                    route: AboutUs,
                    title: '关于我们'
                }
            ]
        ]
    }
];

routes.forEach(route =>
    route.routeList.forEach((item, index) =>
        item.forEach(itemChild =>
            route.key[itemChild.key] = {
                screen: itemChild.route,
                navigationOptions: ({navigation}) => {
                    if (itemChild.title) {
                        return ({
                            headerTitle: itemChild.title,
                            headerStyle: {
                                backgroundColor: defaultColor
                            },
                            headerTintColor: '#fff',
                            headerBackImage: <Image source={require('../components/images/icons/back.png')}/>,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                flex: 1,
                                textAlign: 'center'
                            },
                            headerRight: itemChild.right ?
                                (itemChild.permissions ?
                                    (navigation.getParam(itemChild.permissions) ?
                                        (<TouchableOpacity
                                            onPress={navigation.getParam(itemChild.listening)}>
                                            {itemChild.button}
                                        </TouchableOpacity>) :
                                        <View style={{width: 30}}>
                                        </View>) :
                                    <TouchableOpacity onPress={navigation.getParam(itemChild.listening)}>
                                        {itemChild.button}
                                    </TouchableOpacity>) :
                                index === 0 ? null :
                                    <View style={{width: 30}}>
                                    </View>
                        })
                    } else {
                        return ({
                            header: null
                        })
                    }
                }
            }
        )
    )
);

const HomePage = createStackNavigator({
    MyPageRoutes: {
        screen: createStackNavigator(homePage),
        navigationOptions: () => ({
            header: null
        })
    }
});

const MyPage = createStackNavigator({
    RegulatoryHomePageRoutes: {
        screen: createStackNavigator(myPage),
        navigationOptions: () => ({
            header: null
        })
    }
});

const newPage = createBottomTabNavigator(
    {
        首页: {screen: HomePage},
        我的: {screen: MyPage}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
            tabBarOnPress: (obj) => {
                if (obj.navigation.state.key === '首页') {
                    DeviceEventEmitter.emit('Listener')
                } else {
                    DeviceEventEmitter.emit('remove')
                }
                obj.navigation.navigate(obj.navigation.state.routes[0].routeName)
            }
        }),
        tabBarComponent: props => <TabBarComponent {...props} style={styles.bottomTab}/>
    }
);

// 二级界面及下级界面不展示导航栏
[HomePage, MyPage].forEach(item =>
    item.navigationOptions = ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.routes[0].index > 0) {
            tabBarVisible = false
        }
        return {
            tabBarVisible
        }
    }
);

export function onlineAppNavigator() {
    return createAppContainer(
        createSwitchNavigator(
            {
                App: newPage,
                Login: {screen: Login},
                Splash: {screen: Splash}
            },
            {
                initialRouteName: 'Splash'
            }
        )
    )
}

const styles = StyleSheet.create({
    bottomTab: {
        borderTopColor: '#F4F5F9',
        height: 50,
        backgroundColor: '#fff',
        zIndex: 8
    }
});
