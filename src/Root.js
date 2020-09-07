import React, {Component} from 'react';
import {onlineAppNavigator} from './utils/AppNavigation';
import {StatusBar, View} from 'react-native';
import {defaultColor, isPad} from "./utils/config";
import {commonStyles} from "./utils/commonStyle";
import Orientation from 'react-native-orientation';

export default class Root extends Component {
    componentWillMount(): void {
        if (Orientation.getInitialOrientation() === 'PORTRAIT' && isPad) {
            Orientation.lockToLandscape()
        }
    }

    render() {
        const CreateApp = onlineAppNavigator();
        const statusBar = {backgroundColor: defaultColor};
        return (
            <View style={commonStyles.container}>
                <CreateApp/>
                <StatusBar  {...statusBar}/>
            </View>
        )
    }
}
