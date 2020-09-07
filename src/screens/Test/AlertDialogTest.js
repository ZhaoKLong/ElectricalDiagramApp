import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import {saveSwitch, storage} from "../../utils/storage";
import ButtonComponent from "../../components/ButtonComponent";
import AlertDialog from "../../components/AlertDialogComponent";

export default class AlertDialogTest extends Component {
    state = {
        switch: false,
        visibility: false,
        alertDialogVisible: false
    };

    componentDidMount() {
        storage.load({
            key: 'switch',
            syncInBackground: true
        }).then(ret => {
            this.setState({switch: ret.switch})
        }).catch(err => {
            console.log('err:' + err)
        })
    }

    clickLeft = () => {
        saveSwitch({switch: false});
        ToastAndroid.show(
            '左手模式设置成功！',
            ToastAndroid.SHORT
        );
        this.setState({switch: false});
        this.closeVisible()
    };

    clickRight = () => {
        saveSwitch({switch: true});
        ToastAndroid.show(
            '右手模式设置成功！',
            ToastAndroid.SHORT
        );
        this.setState({switch: true});
        this.closeVisible()
    };

    closeVisible = () => {
        this.setState({visibility: false})
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <TouchableOpacity
                    style={commonStyles.itemTextView}
                    onPress={() => this.setState({visibility: true})}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#141414', fontSize: 16}}>
                            操作习惯
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{color: '#129ee8', fontSize: 16, marginRight: 10}}>
                            {this.state.switch ? '右手模式' : '左手模式'}
                        </Text>
                        <Text style={{textAlign: 'right', fontSize: 16}}>
                            {'>'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={commonStyles.buttonWrapper}>
                    <ButtonComponent onPress={() => this.setState({alertDialogVisible: true})}>
                        测试
                    </ButtonComponent>
                </View>
                <Modal
                    visible={this.state.visibility}
                    transparent={true}
                    animationType={'fade'}
                    onRequestClose={() => this.setState({visibility: false})}
                >
                    <View style={styles.container}>
                        <View>
                            <Text style={{fontSize: 20, color: '#fff', marginLeft: 10}}>
                                请选择您的操作习惯：
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => this.state.switch ? this.clickLeft() : this.closeVisible()}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>左手模式</Text>
                                <Text style={styles.modalMessage}>左手模式</Text>
                                <View style={styles.horizonLine}/>
                                <View style={styles.row}>
                                    <View style={styles.leftBn}>
                                        <Text style={styles.leftBnText}>确认</Text>
                                    </View>
                                    <View style={styles.rightBn}>
                                        <Text style={styles.rightBnText}>取消</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                                <Image style={{width: 16, height: 16}}
                                       source={this.state.switch ? require('../../components/images/icons/cirle.png') : require('../../components/images/icons/right.png')}/>
                                <Text>左手模式</Text>
                            </View>
                            <View style={styles.redCircleL}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => this.state.switch ? this.closeVisible() : this.clickRight()}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>右手模式</Text>
                                <Text style={styles.modalMessage}>右手模式</Text>
                                <View style={styles.horizonLine}/>
                                <View style={styles.row}>
                                    <View style={styles.leftBn}>
                                        <Text style={styles.leftBnText}>取消</Text>
                                    </View>
                                    <View style={styles.rightBn}>
                                        <Text style={styles.rightBnText}>确认</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                                <Image style={{width: 16, height: 16}}
                                       source={this.state.switch ? require('../../components/images/icons/right.png') : require('../../components/images/icons/cirle.png')}/>
                                <Text>右手模式</Text>
                            </View>
                            <View style={styles.redCircleR}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <AlertDialog
                    title='确认弹窗测试' // 标题
                    message='这是一个确认弹窗测试，点击“确认”或者“取消”都会关闭哦' // 主体内容
                    visibility={this.state.alertDialogVisible} // 展示/关闭控制
                    buttonNameL="确认" // 左按钮展示
                    onClickL={() => this.setState({alertDialogVisible: false})} // 左按钮回调
                    buttonNameR="取消" // 右按钮展示
                    onClickR={() => this.setState({alertDialogVisible: false})} // 右按钮回调
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50
    },
    modalContainer: {
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: 'center'
    },
    modalTitle: {
        color: '#000000',
        fontSize: 16,
        marginTop: 10
    },
    modalMessage: {
        color: '#8a8a8a',
        fontSize: 14,
        margin: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    horizonLine: {
        backgroundColor: '#8a8a8a',
        height: 0.5,
        alignSelf: 'stretch'
    },
    leftBn: {
        borderBottomLeftRadius: 3,
        padding: 7,
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftBnText: {
        fontSize: 16,
        color: '#00A9F2'
    },
    rightBn: {
        borderBottomRightRadius: 3,
        padding: 7,
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightBnText: {
        fontSize: 16,
        color: '#00A9F2'
    },
    redCircleL: {
        position: 'relative',
        width: 50,
        height: 50,
        top: -80,
        left: -65,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#f00'
    },
    redCircleR: {
        position: 'relative',
        width: 50,
        height: 50,
        top: -80,
        left: 65,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#f00'
    }
});
