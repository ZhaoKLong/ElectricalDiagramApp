import React, {Component} from 'react';
import {Image, StyleSheet, TextInput, View,} from 'react-native';

export default class TextFieldComponent extends Component {
    render() {
        const {label, placeholder, type, onChange, pic} = this.props;
        return (
            <View style={styles.textField}>
                <Image
                    style={{width: 30, height: 30, marginLeft: 10}}
                    source={pic}/>
                <TextInput
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false}
                    blurOnSubmit={true}
                    style={styles.edit}
                    placeholder={placeholder}
                    secureTextEntry={type === 'password'}
                    keyboardType='ascii-capable'
                    selectTextOnFocus={false}
                    onChangeText={onChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textField: {
        margin: 14,
        height: 50,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    label: {
        textAlign: 'center',
        fontSize: 17,
        width: 85,
        paddingVertical: 2
    },
    edit: {
        marginLeft: 10,
        flex: 1,
        fontSize: 17,
        height: 50
    }
});
