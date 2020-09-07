import React, {Component} from 'react';
import {View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import PDFViewComponent from "../../components/PDFViewComponent";

export default class PDFViewTest extends Component {
    render() {
        return (
            <View style={commonStyles.container}>
                <PDFViewComponent
                    style={{flex: 1}}
                    url={'http://www.yuntsoft.com:7389/group1/M00/00/57/rBDZElxFgw2AZmxvAAMTxRESZ0k979.pdf'}
                />
            </View>
        )
    }
}