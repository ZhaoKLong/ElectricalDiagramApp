import React, {Component} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import {getDateText} from "../utils/dateUtils";

export default class TimeCardComponent extends Component {
    state = {
        time: getDateText(new Date(), false, 'YYYY-MM-DD HH:mm:ss')
    };

    componentDidMount() {
        this.setTime()
    }

    setTime = () => {
        this.setState({time: getDateText(new Date(), false, 'YYYY-MM-DD HH:mm:ss')});
        this.timer = setTimeout(() => this.setTime(), 500)
    };

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={Dialog.container}>
                <Text>
                    {this.state.time}
                </Text>
            </View>
        )
    }
}
const Dialog = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});