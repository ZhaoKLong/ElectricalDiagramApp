import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

export default class NullDateViewComponent extends Component {
    render() {
        return (
            <View style={{...this.props.style, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{}} source={require('./images/background/nullDate.png')}/>
                <Text style={{fontSize: 20, color: '#aaa', textAlign: 'center', marginTop: 10}}>
                    {this.props.message || '暂无数据'}
                </Text>
            </View>
        )
    }
}