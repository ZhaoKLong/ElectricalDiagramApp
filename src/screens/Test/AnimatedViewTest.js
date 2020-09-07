import React, {Component} from 'react';
import {DeviceEventEmitter, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import AnimatedViewComponent from "../../components/AnimatedViewComponent";

export default class AnimatedViewTest extends Component {
    state = {
        showAnimated: false,
        clickedPosition: {
            x: 0,
            y: 0
        }
    };

    componentDidMount(): void {
        this.lister = DeviceEventEmitter.addListener('killAnimated', () => {
            this.setState({showAnimated: false})
        })
    }

    componentWillUnmount(): void {
        this.lister.remove()
    }

    render() {
        return (
            <View style={commonStyles.container}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    activeOpacity={1}
                    onPress={(e) => this.setState({
                            showAnimated: true,
                            clickedPosition: {
                                x: e.nativeEvent.changedTouches[0].pageX,
                                y: e.nativeEvent.changedTouches[0].pageY
                            }
                        }
                    )}
                >
                    <Text>点击任意位置</Text>
                </TouchableOpacity>
                {this.state.showAnimated &&
                <AnimatedViewComponent
                    clickedPosition={this.state.clickedPosition} // 起始位置
                    psgPosition={{x: Dimensions.get('window').width, y: Dimensions.get('window').height}} // 结束位置
                    image={require('../../components/images/background/nullDate.png')} // 图片
                />}
            </View>
        )
    }
}