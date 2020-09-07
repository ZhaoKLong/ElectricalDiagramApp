import React, {Component} from 'react';
import {DeviceEventEmitter, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import AnimatedSelectModal from "../../components/AnimatedSelectComponent";

export default class AnimatedSelectTest extends Component {
    state = {
        visible: false,
        fromPageY: 0,
        viewWidth: 0,
        fromPageX: 0,
        selectedList: [],
        selectedIdList: []
    };

    _onLayout(event) {
        let {x, y, width, height} = event.nativeEvent.layout;
        this.setState({
            viewWidth: width,
            fromPageX: x,
            fromPageY: y + height
        })
    }

    test = () => {
        this.setState({visible: true}, () => DeviceEventEmitter.addListener('killSelectAnimated', () => {
            this.setState({visible: false})
        }))
    };

    onSelect = (key, value) => {
        const selectedList = this.state.selectedList;
        const selectedIdList = this.state.selectedIdList;
        if (selectedIdList.indexOf(key) === -1) {
            this.setState({})
        } else {

        }
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <View
                    style={{width: 100, marginLeft: 50, borderRadius: 5, backgroundColor: '#00b2ff', height: 50}}
                    onLayout={(e) => this._onLayout(e)}
                >
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => this.setState({visible: true})}
                    >
                        <Text style={{color: '#fff'}}>
                            {this.state.selectedList.length === 0 ? '测试' : this.state.selectedList.join(',')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.visible &&
                <AnimatedSelectModal
                    style={{
                        width: this.state.viewWidth,
                        marginLeft: this.state.fromPageX,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.18,
                        shadowRadius: 30,
                        elevation: 10
                    }} // 下拉框样式
                    viewHeight={80} // 高度
                    fromPageY={this.state.fromPageY} // 起始Y轴
                    list={[
                        {key: 0, value: 'a'},
                        {key: 1, value: 'b'},
                        {key: 2, value: 'c'},
                        {key: 3, value: 'd'},
                        {key: 4, value: 'e'},
                        {key: 5, value: 'f'},
                        {key: 6, value: 'g'},
                    ]} // SelectList
                    key='key' // key字段名称
                    value='value' // value字段名称
                    viewStyle={{justifyContent: 'center', alignItems: 'center'}} // Wrapper样式
                    textStyle={{textAlign: 'center', color: '#999'}} // 字体样式
                    isMulti={false} // 是否多选
                    onSelect={this.onSelect} //选择回调
                />}
            </View>
        )
    }
}