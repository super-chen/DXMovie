import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar, Image, Button } from 'react-native-elements';
import { StatusBar, StyleSheet, View, FlatList, ActivityIndicator, TouchableHighlight, Text } from 'react-native';
import * as movie from '../tools/resource';
import Page from './page';
import Detail from './detail';


class HomeScreen extends Component {

    componentDidMount() {
        this.updateSearch('钢铁是怎样');
    }

    state = {
        search: '',
        showLoading: false,
        listData: []
    };

    updateSearch = (search) => {
        this.setState({ search });
        this.setState({ showLoading: true });
        movie.search(search).then(response => {
            const ids = response.data.list.map(i => i.vod_id);
            movie.getDetail(ids).then(res => {
                console.log(res.data.list);
                this.setState({ listData: res.data.list });
                this.setState({ showLoading: false });
            })
        })
    };

    pressList(e) {
        console.log(e);
        this.props.navigation.navigate('Page', e)
    }

    render() {
        const { search, showLoading, listData } = this.state;
        const renderItem = ({ item }) => (
            <TouchableHighlight onPress={() => this.pressList(item)}>
                <View style={styles.search_container}>
                    <Image style={styles.search_pic}
                        source={{ uri: item.vod_pic }}
                        PlaceholderContent={<ActivityIndicator size="large" color="#f9ba48" />}
                    />
                    <View style={styles.search_right}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {item.vod_remarks ? (<Text style={styles.search_remark}>{item.vod_remarks}</Text>) : null}
                            <Text style={styles.search_name}>{item.vod_name}</Text>
                        </View>
                        <Text style={styles.search_subName}>导演: {item.vod_director}</Text>
                        <Text style={styles.search_subName}>主演: {item.vod_actor}</Text>
                        <Text style={styles.search_subName}>语言: {item.vod_lang}</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <View>
                                <Text style={styles.search_subName}>上映时间: {item.vod_year}</Text>
                                <Text style={styles.search_subName}>类型: {item.type_name}  {item.vod_area}</Text>
                            </View>
                            <Button buttonStyle={{ backgroundColor: '#F9BA48' }} title="立刻播放" onPress={() => this.pressList(item)} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
        return (
            <View>
                <StatusBar translucent={false} backgroundColor='#000000' barStyle="light-content" />
                <SearchBar
                    lightTheme
                    placeholder="请输入电影名称"
                    onChangeText={this.updateSearch}
                    value={search}
                    showLoading={showLoading}
                    round={true}
                    loadingProps={{ color: "#000000" }}
                    containerStyle={{ backgroundColor: '#F9BA48' }}
                    inputContainerStyle={{ backgroundColor: '#fdefcf' }}
                    inputStyle={{ color: '#FFAE0E' }}
                />
                <FlatList
                    data={listData}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                />
            </View>
        );
    }
}
{ }

const styles = StyleSheet.create({
    search_container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10
    },
    search_pic: {
        height: 170,
        width: 112,
        borderRadius: 3
    },
    search_remark: {
        backgroundColor: '#F9BA48',
        height: 20,
        borderRadius: 3,
        textAlign: 'center',
        fontSize: 12,
        marginTop: 6,
        marginRight: 2,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1
    },
    search_right: {
        marginLeft: 10,
        flex: 1
    },
    search_name: {
        fontSize: 15,
        color: '#3B3C3D',
        marginTop: 5
    },
    search_subName: {
        fontSize: 12,
        color: '#97999A',
        height: 20,
        marginTop: 7
    }
});


export default class App extends Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Detail" component={Detail} options={{ title: '详情描述' }} />
                    <Stack.Screen name="Page" component={Page} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}