import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {commonStyles} from "../utils/commonStyle";

export default class DescriptionsComponent extends Component {
    render() {
        const {source, json} = this.props;
        return (
            <ScrollView>
                {source.map(item =>
                    <View style={commonStyles.itemTextView}>
                        {item.icon ?
                            <View style={{flexDirection: 'row'}}>
                                {item.icon}
                                <Text style={[commonStyles.titleText, {marginLeft: 10}]}>
                                    {item.title}
                                </Text>
                            </View> :
                            <Text style={commonStyles.titleText}>
                                {item.title}
                            </Text>}
                        <Text style={commonStyles.valueText}>
                            {(json ? json[item.key] : item.key) || '-'}
                        </Text>
                    </View>
                )}
            </ScrollView>
        )
    }
}
