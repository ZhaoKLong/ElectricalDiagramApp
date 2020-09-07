import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import SelectComponent from "../../components/SelectComponent";
import ButtonComponent from "../../components/ButtonComponent";

export default class Root extends Component {
    state = {
        showSelect: false
    };

    render() {
        return (
            <View style={commonStyles.container}>
                <View style={commonStyles.buttonWrapper}>
                    <ButtonComponent onPress={() => this.setState({showSelect: true})}>
                        测试
                    </ButtonComponent>
                </View>
                {this.state.showSelect &&
                <SelectComponent
                    Position={{
                        left: Dimensions.get('window').width / 8 * 5,
                        bottom: 500 - (75 + 7 * 35),
                        width: Dimensions.get('window').width / 4
                    }}
                    lineHeight={35}
                    showNum={7}
                    data={[{value: 0, name: '测试1'}, {value: 1, name: '测试2'}]}
                    onClose={() => this.setState({showSelect: false})}
                    onSelect={(key) => console.log('选择的key为：' + key)}
                    value='value'
                    name='name'
                />}
            </View>
        )
    }
}