import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {commonStyles} from "../../utils/commonStyle";
import ButtonComponent from "../../components/ButtonComponent";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={commonStyles.container}>
                <ScrollView>
                    <View style={{height: 50, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text>
                            react-native 基础框架
                        </Text>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('AlertDialogTest')}>
                            AlertDialogComponent（确认框）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('AnimatedSelectTest')}>
                            AnimatedSelectComponent（下拉选择框）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('AnimatedViewTest')}>
                            AnimatedViewComponent（点击动画）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('FlatListTest')}>
                            FlatListComponent（大量数据列表）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('LookPhotoTest')}>
                            LookPhotoComponent（图片查看）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('MessageDetailTest')}>
                            MessageDetailComponent（富文本）
                        </ButtonComponent>
                    </View>
                    {/*<View style={commonStyles.buttonWrapper}>*/}
                    {/*    <ButtonComponent onPress={() => this.props.navigation.navigate('SelectTest')}>*/}
                    {/*        SelectComponent（滚动多选框）*/}
                    {/*    </ButtonComponent>*/}
                    {/*</View>*/}
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('TimeCardTest')}>
                            TimeCardComponent（动态时间展示）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('VideoTest')}>
                            VideoComponent（视频播放）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('DescriptionsTest')}>
                            DescriptionsComponent（描述列表）
                        </ButtonComponent>
                    </View>
                    <View style={commonStyles.buttonWrapper}>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('FormTest')}>
                            FormComponent（表单提交）
                        </ButtonComponent>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
