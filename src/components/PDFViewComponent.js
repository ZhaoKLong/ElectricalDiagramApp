import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf/index';

export default class PDFViewComponent extends React.Component {
    render() {
        const source = {uri: this.props.url, catch: true};
        return (
            <View style={this.props.style}>
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
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width
    }
});
