import React, {Component} from 'react';
import {Image, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {saveSwitch, storage} from '../../utils/storage';

export default class SystemConfig extends Component {
    state = {
        switch: false,
        visibility: false
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
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
                <View style={{
                    flex: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderBottomColor: '#cdcdcd',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() =>
                            this.setState({visibility: true})
                        }
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <Text style={{
                                color: '#141414',
                                fontSize: 16,
                                marginLeft: 5
                            }}>
                                操作习惯：
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text style={{
                                color: '#129ee8',
                                fontSize: 16,
                                marginRight: 10
                            }}>{this.state.switch ? '右手模式' : '左手模式'}</Text>
                            <Text style={{
                                textAlign: 'right',
                                marginRight: 20,
                                fontSize: 16
                            }}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 32}}>
                </View>
                <Modal
                    visible={this.state.visibility}
                    transparent={true}
                    animationType={'fade'}//none slide fade
                    onRequestClose={() => this.setState({visibility: false})}
                >
                    <View style={styles.container}>
                        <View>
                            <Text style={{fontSize: 20, color: '#fff', marginLeft: 10}}>
                                请选择您的操作习惯：
                            </Text>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                          onPress={() => this.state.switch ? this.clickLeft() : this.closeVisible()}>
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
                            <View style={{
                                position: 'relative',
                                width: 50,
                                height: 50,
                                top: -80,
                                left: -65,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: '#f00'
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                          onPress={() => this.state.switch ? this.closeVisible() : this.clickRight()}>
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
                            <View style={{
                                position: 'relative',
                                width: 50,
                                height: 50,
                                top: -80,
                                left: 65,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: '#f00'
                            }}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        alignItems: 'center',
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
    }
});
