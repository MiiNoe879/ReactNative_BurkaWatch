import React, { Component } from 'react';
import { Container, Header, Content, 
    Form, Item, Input, Label, Left, Right, Body, 
    Title, Button, Footer, FooterTab, Icon,View, 
    List, ListItem, Segment, 
    TouchableOpacity, 
    Text} from 'native-base';
import styles from "./styles";
import { Image, TouchableHighlight, ActivityIndicator, AsyncStorage } from "react-native";
import InfiniteScroll from 'react-native-infinite-scroll';

var helpers = require('../../utils/helpers');

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seg: 2,//My burkas
            isLoadingMore: true,
            page: 1,
            count_per_page: 4,
            total: 0,
            burkas: []
        };
        this.loadMorePage = this.loadMorePage.bind(this)
        this.initBurkas = this.initBurkas.bind(this)
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        AsyncStorage.getItem('token', (err, result) => {
            if(this.state.seg==1){
                helpers.getLatestImages(result,this.state.count_per_page, this.state.page)
                .then(function(data){
                    console.log(data);
                    var total = data.total
                    data = data.data;
                    this.setState({
                        total:data.total
                    });
                    if(data.code){
                    } else{
                        var burkas = this.state.burkas
                        burkas = burkas.concat(data.data)
                        this.setState({
                            burkas: burkas
                        });
                        console.log(this.state.burkas);
                    }
                    page = this.state.page;
                    page++;
                    this.setState({
                        isLoadingMore: false,
                        isRefreshing: false,
                        page: page,
                        burkas: this.state.burkas
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
                        burkas: this.state.burkas
                    });
                }.bind(this));
            }
            else{
                helpers.getUserImages(result,this.state.count_per_page, this.state.page)
                .then(function(data){
                    console.log(data);
                    var total = data.total
                    data = data.data;
                    this.setState({
                        total:data.total
                    });
                    if(data.code){
                    } else{
                        var burkas = this.state.burkas
                        burkas = burkas.concat(data.data)
                        this.setState({
                            burkas: burkas
                        });
                        console.log(this.state.burkas);
                    }
                    page = this.state.page;
                    page++;
                    this.setState({
                        isLoadingMore: false,
                        isRefreshing: false,
                        page: page,
                        burkas: this.state.burkas
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
                        burkas: this.state.burkas
                    });
                }.bind(this));
            }
        });
    }

    initBurkas(seg){
        this.setState({
            seg: seg,
            page: 1,
            isLoadingMore: false,
            isRefreshing: false,
            burkas: []
        })
        this.loadData()
    }
    
    loadMorePage(){
        console.log("loading....");
        if(this.state.isLoadingMore==false){
            this.setState({
                isLoadingMore: true
            })
            setTimeout( () => {
                this.loadData()
            }, 2000)
        }
    }

    render() {
        let burkas = this.state.burkas.map((a, i) => {
            //return <View key={i} style={{ height:40, borderBottomWidth:2, borderBottomColor: '#ededed' }}><Text>{ a }</Text></View>
            var date = a.updated_at
            var dateStr = date.split(' ')
            var uri = ''
            if(a.s3_path)
                uri = a.s3_path
            return <View style={styles.col} ><TouchableHighlight onPress={() => this.props.navigation.navigate('Detail',{id:a.id, seg: this.state.seg})}><Image source={{uri: uri}} style={styles.burka} /></TouchableHighlight><Text style={styles.txtlocation}>{a.location}</Text><Text note style={styles.txtdate}>{dateStr[0]}</Text></View>
        }) 
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                </Left>
                <Body>
                    <Title>Gallery</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Segment style={styles.header}>
                <Button
                    first
                    active={this.state.seg === 1 ? true : false}
                    onPress={() => this.initBurkas(1)}
                    >
                    <Text>Overview</Text>
                </Button>
                <Button
                    last
                    active={this.state.seg === 2 ? true : false}
                    onPress={() => this.initBurkas(2)}
                    >
                    <Text>My Burkas</Text>
                </Button>
            </Segment>
            <Content scrollEnabled={false}>
                <InfiniteScroll
                    horizontal={false}  //true - if you want in horizontal 
                    onLoadMoreAsync={this.loadMorePage}
                    distanceFromEnd={10} // distance in density-independent pixels from the right end 
                    style={styles.scrollView}>
                    <View style={styles.row}>
                        {burkas}
                    </View>
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                        {this.state.isLoadingMore
                            ? <ActivityIndicator
                                //color={this.props.spinnerColor}
                                animating={true}
                                size="small"
                            />
                            : <View />}
                    </View>
                </InfiniteScroll>
            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                        <Icon name="ios-compass-outline" />
                        <Text style={[styles.tabtext, styles.active]}>Map</Text>
                    </Button>
                    <Button vertical active>
                        <Icon name="ios-images-outline" active/>
                        <Text style={styles.tabtext}>Gallery</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Profile')}>
                        <Icon name="contact"/>
                        <Text style={styles.tabtext}>Profile</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Leaders')}>
                        <Icon name="ios-trophy-outline" />
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