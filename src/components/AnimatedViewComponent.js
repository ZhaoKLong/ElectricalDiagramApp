import React, {Component} from 'react';
import {Animated, DeviceEventEmitter, Image} from 'react-native';

export default class AnimatedViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            fromPageX: props.clickedPosition.x - 20,
            fromPageY: props.clickedPosition.y - 70,
            toPageX: props.psgPosition.x,
            toPageY: props.psgPosition.y,
            image: props.image
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1,
                duration: 600
            }
        ).start(() => DeviceEventEmitter.emit('killAnimated'))
    }

    render() {
        const {
            animValue,
            fromPageX,
            fromPageY,
            toPageX,
            toPageY
        } = this.state;
        return (
            <Animated.View
                style={{
                    zIndex: 9, //避免被覆盖
                    position: 'absolute',
                    opacity: animValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    }),
                    transform: [
                        {
                            translateX: animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [fromPageX, toPageX]
                            })
                        },
                        {
                            translateY: animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [fromPageY, toPageY]
                            })
                        },
                        {
                            rotateZ: animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        },
                        {
                            scale: animValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            })
                        }
                    ]
                }}
            >
                <Image
                    source={this.state.image}
                    style={[
                        {
                            width: 36,
                            height: 32,
                            zIndex: 9
                        }
                    ]}
                />
            </Animated.View>
        )
    }
}