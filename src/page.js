import React, { Component } from 'react';
import VideoPlayer from 'react-native-video-controls';
import { StatusBar, View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Orientation from 'react-native-orientation';

class Page extends Component {

    componentWillUnmount() {
        StatusBar.setHidden(false)
        Orientation.lockToPortrait();
    }

    componentDidMount() {
        const { vod_play_url, vod_play_note } = this.props.route.params;
        const playStr = vod_play_url.split(vod_play_note)[1];
        const temp = playStr.split('#');
        let serialList = temp.map(i => ({ name: i.split('$')[0].replace('第', '').replace('集', ''), uri: i.split('$')[1] }))
        this.setState({ serialList })
    }

    state = {
        videoStyle: styles.exitFullscreen,
        selectSerial: 0,
        serialList: []
    };

    onEnterFullscreen = () => {
        StatusBar.setHidden(true)
        Orientation.lockToLandscapeLeft();
        this.setState({ videoStyle: styles.enterFullscreen })
    }

    onExitFullscreen = () => {
        StatusBar.setHidden(false)
        Orientation.lockToPortrait();
        this.setState({
            videoStyle: styles.exitFullscreen
        })
    }

    onBack = () => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'PORTRAIT') {
                this.props.navigation.goBack()
            } else {
                this.onExitFullscreen();
            }
        });
    }

    selectSerial() {

    }

    renderSerial = () => {
        let html = [];
        this.state.serialList.forEach((item, index) => {
            html.push(
                <Button
                    buttonStyle={styles.serial_btn}
                    titleStyle={{ color: index == this.state.selectSerial ? '#F9BA48' : '#040221' }}
                    title={item.name}
                    onPress={() => this.setState({ selectSerial: index })}
                />
            );
        })
        return (
            <>
                <Text style={styles.search_name}>剧集</Text>
                <View style={{ width: 400, flexDirection: 'row', flexWrap: 'wrap', }}>
                    {html}
                </View>
            </>
        );
    }

    render() {
        const { vod_name, vod_director, vod_actor, vod_lang, vod_content, vod_serial } = this.props.route.params;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingVertical: 225 }} style={{ height: Dimensions.get('screen').height, paddingLeft: 10, paddingRight: 10 }} >
                    {this.renderSerial(vod_serial)}
                    <Text style={styles.search_name}>{vod_name}</Text>
                    <Text style={styles.search_subName}>导演: {vod_director}</Text>
                    <Text style={styles.search_subName}>主演: {vod_actor}</Text>
                    <Text style={styles.search_subName}>语言: {vod_lang}</Text>
                    <Text style={styles.search_name}>剧情简介</Text>
                    <Text style={styles.search_subName}>语言: {vod_content}</Text>
                </ScrollView>
                <View style={this.state.videoStyle}>
                    <VideoPlayer
                        source={this.state.serialList[this.state.selectSerial]}
                        onBack={this.onBack}
                        onEnterFullscreen={this.onEnterFullscreen}
                        onExitFullscreen={this.onExitFullscreen}
                        disableVolume={true}
                        disableVolume
                        resizeMode='contain'
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: { position: 'absolute', flex: 1, backgroundColor: '#ffffff' },
    search_pic: {
        height: 170,
        width: 112,
        borderRadius: 2
    },
    search_right: {
        marginLeft: 10,
        flex: 1
    },
    search_name: {
        fontSize: 15,
        color: '#00001e',
        marginTop: 20
    },
    search_subName: {
        fontSize: 12,
        color: '#97999A',
        marginTop: 7
    },
    serial_btn: {
        backgroundColor: '#F2F8F9',
        height: 45,
        marginTop: 20,
        marginRight: 20,
        paddingLeft: 14,
        paddingRight: 14,
    },
    exitFullscreen: {
        width: 400,
        height: 225,
        position: 'absolute'
    },
    enterFullscreen: {
        width: Dimensions.get('screen').height,
        height: Dimensions.get('screen').width,
        position: 'absolute'
    }
});

export default Page
