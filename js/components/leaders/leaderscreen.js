import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Body, Title, Button, Text, Footer, FooterTab, Icon,View, Spinner } from 'native-base';
import {InfiniteListView} from "react-native-infinite-listview";
import { TouchableOpacity, AsyncStorage, Alert } from "react-native";
import styles from "./styles";
var helpers = require('../../utils/helpers');
const DEFAULT_LIST = [];
console.disableYellowBox = true;

export default class Leaders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: true,
            isLoadingMore: true,
            listItems: [],
            total: 0,
            page: 1,
            count_per_page: 10
        }
    }
    
    componentDidMount(){
        this.loadData()
    }

    loadData(){
        AsyncStorage.getItem('token', (err, result) => {
            helpers.getLeaderboard(result,this.state.count_per_page,this.state.page)
            //helpers.getLatestImages(result,this.state.count_per_page, this.state.page)
            .then(function(data){
                console.log(data);
                var total = data.total
                data = data.data;
                this.setState({
                    total:data.total
                });
                if(data.code){
                } else{
                    var listitems = this.state.listItems
                    listitems = listitems.concat(data.data)
                    this.setState({
                        listItems: listitems
                    });
                    console.log(this.state.listItems);
                }
                page = this.state.page;
                page++;
                this.setState({
                    isLoadingMore: false,
                    isRefreshing: false,
                    page: page,
                    listItems: [...this.state.listItems, ...DEFAULT_LIST]
                });
            }.bind(this))
            .catch(function (error) {
                Alert.alert(
                    'Error',
                    'Connection Error',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
                this.setState({
                    isLoadingMore: false,
                    isRefreshing: false,
                    listItems: [...this.state.listItems, ...DEFAULT_LIST]
                    });
            }.bind(this));
        });
    }

    onRefresh = () => {
        this.setState({ isRefreshing: true, isLoadingMore: false, page: 1, listItems: [] })
        setTimeout( () => {
            this.loadData()
            this.setState({ isRefreshing: false })
        }, 2000)
    };

    canLoadMoreContent = () => {
        return this.state.listItems.length < this.state.total && !this.state.isLoadingMore;
    };

    onLoadMore = () => {
        console.log('start loading more')
        //var page = this.state.page++
        this.setState({ 
            isLoadingMore: true,
            //page: page
        });
        
        setTimeout( () => {
            console.log('stop loading more');
            this.loadData()
            /*this.setState({
                isLoadingMore: false,
                listItems: [...this.state.listItems, ...DEFAULT_LIST]
            });*/
        }, 3000);
    };

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={{flexDirection: 'row'}}>
            <View style={styles.body}>
                <View style={styles.mainbody}>
                    <Text style={styles.no}>{Number(rowID)+1+'.'}</Text>
                    <Text style={styles.title}>{rowData.nickname}</Text>
                </View>
                <Text style={styles.message}>{rowData.count}</Text>
            </View>
            <View style={styles.devider} />
            </View>
        );
    };

    /*renderLoadMoreRow = () => {
    return (
        <View
        style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
        >
        {this.state.isLoadingMore
            ? <ActivityIndicator
                color={this.props.spinnerColor}
                animating={true}
                size="small"
            />
            : <View />}
        </View>
    );
    };*/ 
    render() {
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
            <Left>
            </Left>
            <Body>
                <Title>Leaderboard</Title>
            </Body>
            <Right>
            </Right>
            </Header>
            <Content scrollEnabled={false}>
                <View style={styles.description}>
                    <View style={styles.rowview}>
                        <Text style={styles.textbold}>1st </Text>
                        <Text style={styles.text}>place end of the countdown</Text>
                    </View>
                    <View style={styles.rowview}>
                        <Text style={styles.text}>wins an </Text>
                        <Text style={styles.textbold}>IPhone 8</Text>
                    </View>
                    <Text style={styles.texttime}>13 Days, 13 Hours</Text>
                </View>
                <InfiniteListView
                    style={styles.listview}
                    dataArray={this.state.listItems}
                    renderRow={this.renderRow}
                    onRefresh={this.onRefresh}
                    isRefreshing={this.state.isRefreshing}
                    canLoadMore={this.canLoadMoreContent}
                    isLoadingMore={this.state.isLoadingMore}
                    /*renderLoadMoreRow={this.renderLoadMoreRow}*/
                    onLoadMore={this.onLoadMore}
                />
            </Content>
            <Footer>
            <FooterTab>
                <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                <Icon name="ios-compass-outline" />
                <Text style={[styles.tabtext, styles.active]}>Map</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('Gallery')}>
                <Icon name="ios-images-outline" />
                <Text style={styles.tabtext}>Gallery</Text>
                </Button>
                <Button vertical onPress={() => this.props.navigation.navigate('Profile')}>
                <Icon name="contact" />
                <Text style={styles.tabtext}>Profile</Text>
                </Button>
                <Button vertical active>
                <Icon name="ios-trophy" />
                <Text style={styles.tabtext}>Leaders</Text>
                </Button>
                <Button vertical
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                <Icon name="ios-apps-outline" />
                <Text style={styles.tabtext}>Menu</Text>
                </Button>
            </FooterTab>
            </Footer>
        </Container>
        );
    }
}