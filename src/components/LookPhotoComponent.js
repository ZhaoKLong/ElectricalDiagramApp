import React, {Component} from 'react';
import {ActivityIndicator, CameraRoll, Dimensions, Modal, Platform, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class LookPhotoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            animating: true,
        };
        this.renderLoad = this.renderLoad.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
        this._Close = this._Close.bind(this)
    }

    _Close() {
        this.props.close()
    }

    renderLoad() { //这里是写的一个loading
        return (
            <View style={{marginTop: (screenHeight / 2) - 20}}>
                <ActivityIndicator animating={this.state.animating} size={"large"}/>
            </View>
        )
    }

    savePhoto() {
        let index = this.props.currentImage;
        let url = this.props.imageDataUrl[index];
        let promise = CameraRoll.saveToCameraRoll(url);
        promise.then(function (result) {
            alert("已保存到系统相册")
        }).catch(function (error) {
            alert('保存失败！\n' + error)
        })
    }

    render() {
        let imageData = this.props.imageDataUrl;
        // let IsArray = Array.isArray(this.props.imaeDataUrl)
        let ImageObjArray = [];
        for (let i = 0; i < imageData.length; i++) {
            let Obj = {};
            Obj.url = imageData[i];
            Obj.props = {};
            ImageObjArray.push(Obj)
        }
        return (
            <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.close()
                    }}
                >
                    <ImageViewer
                        imageUrls={ImageObjArray} // 照片路径
                        // enableImageZoom={true} // 是否开启手势缩放
                        saveToLocalByLongPress={false} //是否开启长按保存
                        index={this.props.currentImage} // 初始显示第几张
                        // // failImageSource={} // 加载失败图片
                        // loadingRender={this.renderLoad}
                        enableSwipeDown={false}
                        maxOverflow={Platform.OS === 'android' ? 0 : 300}
                        // menuContext={{"saveToLocal": "保存图片", "cancel": "取消"}}
                        // onChange={(index) => {
                        // }} // 图片切换时触发
                        onClick={() => { // 图片单击事件
                            this._Close()
                        }}
                        // onSave={(url) => {
                        //     this.savePhoto(url)
                        // }}
                    />
                </Modal>
            </View>
        )
    }
}