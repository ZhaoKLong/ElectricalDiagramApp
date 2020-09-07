import React, {Component} from 'react';
import {View, WebView} from 'react-native';

export default class MessageDetailComponent extends Component {
    render() {
        const {detail, style} = this.props;
        return (
            <View style={style}>
                <WebView
                    style={{height: '100%', width: '100%'}}
                    source={{html: detail}}
                    originWhitelist={['*']}
                />
            </View>
        )
    }
}