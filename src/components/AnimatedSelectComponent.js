import React, {Component} from 'react';
import {Animated, DeviceEventEmitter, Dimensions, ScrollView, Text, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class AnimatedSelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1,
                duration: 200
            }
        ).start()
    }

    onPress = (index) => {
        const {onSelect, isMulti, key, list, value} = this.props;
        if (isMulti) {

        } else {
            onSelect(list[index][key], list[index][value])
        }
    };

    onClose = () => {
        Animated.timing(
            this.state.animValue,
            {
                toValue: 0,
                duration: 100
            }
        ).start(() => DeviceEventEmitter.emit('killSelectAnimated'))
    };

    render() {
        const {animValue} = this.state;
        const {list, style, value, viewStyle, textStyle, viewHeight, fromPageY} = this.props;
        return (
            <TouchableOpacity
                style={{
                    width: width,
                    height: height,
                    zIndex: 8, //避免被覆盖
                    position: 'absolute'
                }}
                activeOpacity={1}
                onPress={() => this.onClose()}
            >
                <Animated.View
                    style={[{
                        height: viewHeight,
                        transform: [
                            {
                                translateY: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [fromPageY - viewHeight / 2, fromPageY]
                                })
                            },
                            {
                                scaleY: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }, style]}
                >
                    <ScrollView style={{zIndex: 9, width: '100%'}}>
                        {list.map((item, index) =>
                            <TouchableOpacity
                                style={viewStyle}
                                onPress={() => this.onPress(index)}
                            >
                                <Text style={textStyle}>
                                    {item[value]}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}