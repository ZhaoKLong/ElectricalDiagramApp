import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import * as Orientation from "react-native-orientation";
import VideoComponent from "../../components/VideoComponent";

const videoList = [
    {
        image: 'http://www.yuntsoft.com:7389/group1/M00/01/5B/rBDZEl1nSkaAFBp0AARViVprq7I687.jpg',
        video: 'http://www.yuntsoft.com:7389/group1/M00/01/5B/rBDZEl1nSqiASEGnCVE17ZPGTck840.mp4'
    },
    {
        image: 'http://www.yuntsoft.com:7389/group1/M00/01/5B/rBDZEl1nS3KAZQ4ZAARgVnbl4z0433.jpg',
        video: 'http://www.yuntsoft.com:7389/group1/M00/01/5B/rBDZEl1nSzyAWjLGBaLcdTnxvF8441.mp4'
    },
];

export default class VideoTest extends Component {
    state = {
        videoUrl: '',
        visible: false
    };

    onClose = () => {
        this.setState({visible: false}, () => setTimeout(() => Orientation.lockToPortrait(), 0))
    };

    render() {
        return (
            <View style={commonStyles.container}>
                {videoList.map(item =>
                    <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
                        <TouchableOpacity onPress={() =>
                            this.setState({
                                videoUrl: item.video,
                                visible: true
                            }, () => setTimeout(() => Orientation.lockToLandscape(), 0))
                        }>
                            <Image
                                style={{width: '100%', height: 100, borderRadius: 8}}
                                source={{uri: item.image}}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {this.state.visible &&
                <VideoComponent
                    visible={this.state.visible}
                    videoUrl={this.state.videoUrl}
                    onClose={() => this.onClose()}
                />}
            </View>
        )
    }
}