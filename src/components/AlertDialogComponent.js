import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableHighlight, View,} from 'react-native';
import PropTypes from 'prop-types';
import {storage} from "../utils/storage";

export default class AlertDialogComponent extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);  // 需要在回调函数中使用this,必须使用bind(this)来绑定
        this.state = {
            switch: false
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired, // 对话框标题
        message: PropTypes.any.isRequired, // 对话框标题
        buttonNameL: PropTypes.string.isRequired,  // 按钮名字
        buttonNameR: PropTypes.string.isRequired,  // 按钮名字
        onClickL: PropTypes.func.isRequired,  // 回调函数
        onClickR: PropTypes.func.isRequired  // 回调函数
    };

    componentDidMount(): void {
        storage.load({
            key: 'switch',
            syncInBackground: true
        }).then(ret => {
            this.setState({switch: ret.switch})
        }).catch(err => {
            console.log('err:' + err)
        })
    }

    _onClick() {
        if (this.props.onClick) {   // 在设置了回调函数的情况下
            this.props.onClick(this.props.pageName)  // 执行回调
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType={'fade'}//none slide fade
                onRequestClose={() => this.setState({visibility: false})}
            >
                <View style={Dialog.container}>
                    <View style={Dialog.modalContainer}>
                        {this.props.title &&
                        <Text style={Dialog.modalTitle}>{this.props.title}</Text>
                        }
                        {typeof this.props.message === 'string' ?
                            <Text style={Dialog.modalMessage}>{this.props.message}</Text> :
                            <View>{this.props.message}</View>
                        }
                        <View style={Dialog.horizonLine}/>
                        {this.state.switch ?
                            <View style={Dialog.row}>
                                {this.props.buttonNameR &&
                                <TouchableHighlight style={Dialog.rightBn} onPress={this.props.onClickR}>
                                    <Text style={Dialog.rightBnText}>{this.props.buttonNameR}</Text>
                                </TouchableHighlight>
                                }
                                {this.props.buttonNameL &&
                                <TouchableHighlight style={Dialog.leftBn} onPress={this.props.onClickL}>
                                    <Text style={Dialog.leftBnText}>{this.props.buttonNameL}</Text>
                                </TouchableHighlight>
                                }
                            </View> :
                            <View style={Dialog.row}>
                                {this.props.buttonNameL &&
                                <TouchableHighlight style={Dialog.leftBn} onPress={this.props.onClickL}>
                                    <Text style={Dialog.leftBnText}>{this.props.buttonNameL}</Text>
                                </TouchableHighlight>
                                }
                                {this.props.buttonNameR &&
                                <TouchableHighlight style={Dialog.rightBn} onPress={this.props.onClickR}>
                                    <Text style={Dialog.rightBnText}>{this.props.buttonNameR}</Text>
                                </TouchableHighlight>
                                }
                            </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}
const Dialog = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});