import React from 'react';
import {Animated, DeviceEventEmitter, Dimensions, ScrollView, Text, TouchableOpacity} from 'react-native';

export default class SelectComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            Position: props.Position,
            lineHeight: props.lineHeight,
            showNum: props.showNum
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1,
                duration: 300
            }
        ).start(() => DeviceEventEmitter.emit('killAnimated'))
    }

    render() {
        const {
            animValue,
            Position,
            showNum,
            lineHeight
        } = this.state;
        return (
            <TouchableOpacity
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    zIndex: 9
                }}
                onPress={() => this.props.onClose()}
            >
                <Animated.View
                    style={{
                        ...Position,
                        height: lineHeight * showNum,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        zIndex: 9, //避免被覆盖
                        position: 'absolute',
                        opacity: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        }),
                        transform: [
                            {
                                scale: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }
                        ]
                    }}
                >
                    <ScrollView>
                        {this.props.data.map(item =>
                            <TouchableOpacity
                                style={{
                                    height: lineHeight,
                                    justifyContent: 'center',
                                    borderColor: '#999',
                                    borderBottomWidth: 1
                                }}
                                onPress={() => this.props.onSelect(item[this.props.value])}
                            >
                                <Text style={{textAlign: 'center'}}>{item[this.props.name]}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}