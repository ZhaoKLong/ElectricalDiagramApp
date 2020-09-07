import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf/index';
import {defaultBackgroundColor} from "../../utils/config";

export default class AboutUs extends React.Component {
    state = {url: ''};

    componentDidMount() {
        const {navigation} = this.props;
        this.setState({
            url: navigation.state.params.url
        })
    }

    render() {
        const source = {uri: this.state.url, catch: true};

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`)
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`)
                    }}
                    onError={(error) => {
                        console.log(error)
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: defaultBackgroundColor
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width
    }
});
