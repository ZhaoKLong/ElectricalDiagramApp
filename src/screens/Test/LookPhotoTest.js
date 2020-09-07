import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import LookPhotoComponent from "../../components/LookPhotoComponent";

const imageList = ['http://www.yuntsoft.com:7389/group1/M00/00/4C/rBDZElw8AVCAfP0vAABVvUhpt3I417.jpg', 'http://www.yuntsoft.com:7389/group1/M00/00/4C/rBDZElw8ATSARZ5CABWVDKrhktE191.png'];

export default class LookPhotoTest extends Component {
    state = {
        visible: false,
        currentIndex: 0
    };

    render() {
        return (
            <View style={commonStyles.container}>
                {imageList.map((item, index) =>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => this.setState({visible: true, currentIndex: index})}
                    >
                        <Image style={{width: 300, height: 200}} source={{uri: item}}/>
                    </TouchableOpacity>
                )}
                {this.state.visible &&
                <LookPhotoComponent
                    currentImage={this.state.currentIndex}
                    imageDataUrl={imageList}
                    modalVisible={this.state.visible}
                    close={() => this.setState({visible: false})}/>}
            </View>
        )
    }
}