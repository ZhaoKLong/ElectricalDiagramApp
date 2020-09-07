import {StyleSheet} from 'react-native';

import {getRealDP} from '../DownLoad/utility';

// 进度条modal样式
export default StyleSheet.create({
    imageBg: {
        width: getRealDP(240),
        height: getRealDP(70),

        borderTopLeftRadius: getRealDP(13),
        borderTopRightRadius: getRealDP(13),
        backgroundColor: '#eb3136',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    // 默认进度条背景底色
    barBackgroundStyle: {
        backgroundColor: '#e0e0e0'
    },
    subView: {
        width: getRealDP(240),
        height: getRealDP(130),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        width: getRealDP(240),
        height: getRealDP(20),
        borderBottomLeftRadius: getRealDP(13),
        borderBottomRightRadius: getRealDP(13),
        backgroundColor: '#FFF'
    },
    textPackageSize: {
        fontSize: getRealDP(20),
        color: '#686868',
        marginTop: getRealDP(18)
    },
    title: {
        color: '#FFF',
        fontSize: getRealDP(22)
    }
});
