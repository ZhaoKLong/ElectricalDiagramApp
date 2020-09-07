import React, {PureComponent} from 'react';
import {
    View,
    Modal,
    Text,
    ImageBackground
} from 'react-native';
import Bar from '../DownLoad/Bar';
import {getRealDP} from '../DownLoad/utility';
import styles from '../DownLoad/progress-bar-modal';

const propTypes = {
    ...Modal.propTypes,
};

const defaultProps = {
    animationType: 'none',
    transparent: true,
    progressModalVisible: false,
    onRequestClose: () => {
    },
};

/* 更新进度条Modal */
class ProgressBarModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: '正在下载更新文件' // 更新提示标题
        };
    }

    render() {
        const {
            animationType,
            transparent,
            onRequestClose,
            progress,
            progressModalVisible,
            totalPackageSize,
            receivedPackageSize,
        } = this.props;
        return (
            <Modal
                animationType={animationType}
                transparent={transparent}
                visible={progressModalVisible}
                onRequestClose={onRequestClose}
            >
                <View style={styles.progressBarView}>
                    <ImageBackground
                        // source={hotUpdateBg}
                        style={styles.imageBg}
                    >
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                    </ImageBackground>
                    <View style={styles.subView}>
                        <Bar
                            style={{width: getRealDP(180), borderRadius: getRealDP(15)}}
                            progress={progress}
                            backgroundStyle={styles.barBackgroundStyle}
                        />
                        <Text style={styles.textPackageSize}>
                            {`${receivedPackageSize}/${totalPackageSize}`}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}/>
                </View>
            </Modal>
        );
    }
}

ProgressBarModal.propTypes = propTypes;
ProgressBarModal.defaultProps = defaultProps;

export default ProgressBarModal;
