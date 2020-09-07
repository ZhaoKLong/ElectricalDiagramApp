import React from 'react';
import {
    Image,
    Modal,
    Platform,
    ProgressBarAndroid,
    ProgressViewIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Video from "react-native-video";

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    // return [zero(h), zero(i), zero(s)].join(":");
    return [zero(i), zero(s)].join(":");
}

export default class VideoComponent extends React.PureComponent {
    state = {
        rate: 1,
        volume: 0.3,
        muted: false,
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
        showVideoControl: true
    };

    componentDidMount() {
    }

    onLoad = (data) => {
        this.setState({duration: data.duration});
    };

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime})
    };

    onEnd = () => {
        this.setState({paused: true});
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    // 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            // 5秒后自动隐藏工具栏
            this.setState({showVideoControl: true}, () => setTimeout(() => this.setState({showVideoControl: false}), 5000))
        }
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.onClose()}
                supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
            >
                <View style={styles.container}>
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        source={{uri: this.props.videoUrl}}   // 可以是一个 URL 或者 本地文件
                        resizeMode='contain'//缩放模式（小于等于）（cover为大于等于）
                        style={styles.backgroundVideo}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 9
                        }}
                        onPress={() => this.setState({paused: !this.state.paused})}>
                        {this.state.paused && <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000050',
                            zIndex: 8
                        }}>
                            <Image source={require('./images/icons/playCircle.png')}/>
                        </View>}
                    </TouchableOpacity>
                    {this.state.showVideoControl ?
                        <View style={{flex: 1, zIndex: 8}}>
                            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <View
                                    style={{
                                        height: 40,
                                        width: '100%',
                                        flexDirection: 'row',
                                        backgroundColor: '#ffffff80'
                                    }}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            if (this.state.rate === 2) {
                                                this.setState({rate: 1})
                                            } else {
                                                this.setState({rate: this.state.rate + 0.5})
                                            }
                                        }}>
                                            <Text>{this.state.rate}X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            this.setState({currentTime: this.state.currentTime < 5 ? 0 : (this.state.currentTime - 5)}, () => this.video.seek(this.state.currentTime))
                                        }}>
                                            <Image source={require('./images/icons/back5.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            this.setState({paused: !this.state.paused})
                                        }}>
                                            <Image
                                                source={this.state.paused ? require('./images/icons/play.png') : require('./images/icons/stop.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            this.setState({currentTime: (this.state.duration - this.state.currentTime < 5) ? this.state.duration : (this.state.currentTime + 5)}, () => this.video.seek(this.state.currentTime))
                                        }}>
                                            <Image source={require('./images/icons/go5.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 5, justifyContent: 'center'}}>
                                        {Platform.OS === 'android' ?
                                            <ProgressBarAndroid
                                                styleAttr="Horizontal"
                                                indeterminate={false}
                                                progress={this.state.currentTime / this.state.duration}
                                                style={{width: '90%'}}
                                            /> :
                                            <ProgressViewIOS
                                                progressViewStyle="bar"
                                                progress={this.state.currentTime / this.state.duration}
                                            />
                                        }
                                    </View>
                                    <View style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text>
                                            {`${formatTime(this.state.currentTime)}/${formatTime(this.state.duration)}`}
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            this.setState({volume: (this.state.volume - 0.1) <= 0.0 ? 0.0 : (this.state.volume - 0.1).toFixed(1) * 1})
                                        }}>
                                            <Image source={require('./images/icons/vdown.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text>{this.state.volume * 10}</Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => {
                                            this.setState({volume: (this.state.volume + 0.1) >= 1.0 ? 1.0 : (this.state.volume + 0.1).toFixed(1) * 1})
                                        }}>
                                            <Image source={require('./images/icons/vup.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={{
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }} onPress={() => this.props.onClose()}
                                        >
                                            <Image
                                                source={require('./images/icons/icon_control_shrink_screen.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View> : null}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 7
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12
    }
});
