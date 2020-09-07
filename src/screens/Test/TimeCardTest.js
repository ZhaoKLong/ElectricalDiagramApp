import React, {Component} from 'react';
import {View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import TimeCardComponent from "../../components/TimeCardComponent";

export default class TimeCardTest extends Component {
    render() {
        return (
            <View style={commonStyles.container}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TimeCardComponent/>
                </View>
            </View>
        )
    }
}