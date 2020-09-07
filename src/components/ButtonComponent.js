import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
// 第三方Button组件
const APSLButton = require('apsl-react-native-button');

export default class ButtonComponent extends Component {
    render() {
        const {style, textStyle, children} = this.props;
        return (
            <APSLButton
                {...this.props}
                style={[styles.button, style]}
                textStyle={[styles.buttonText, textStyle]}
            >{children}</APSLButton>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 16,
        backgroundColor: '#03a9f4',
        borderRadius: 10,
        borderWidth: 0
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});
