import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  List, ListItem
} from "native-base";

var helpers = require('../../utils/helpers');

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

import styles from "./styles";
import { Image } from "react-native";
import Camera from 'react-native-camera';

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  };
  
  constructor(props) {
    super(props);
    this.state = {
        nickname: ''
    };
  };

  componentDidMount(){
    AsyncStorage.getItem('userinfo', (err,result) => {
      if(result){
        userinfo = JSON.parse(result);
        this.setState({
          nickname: userinfo.nickname
        });
      }
      else{
        AsyncStorage.getItem('token', (err, result) => {
          helpers.getuserinfo(result)
            .then(function(data){
              this.setState({
                loading: false
              });
              console.log(data);
              data = data.data;
              if(data.code){
                alert("Failure")
              } else{
                this.setState({
                  nickname: data.user.nickname
                });
                var user = data.user;
                
                AsyncStorage.setItem('userinfo',JSON.stringify(data.user));
              }
            }.bind(this))
            .catch(function (error) {
              this.setState({
                loading: false
              });
              alert("Error")
            }.bind(this));
        });
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../../images/logo.png')} style={styles.logo}/>
        <View style={styles.welcomeview}>
          <Text style={styles.welcometxt}>{'WELCOME'}</Text>
          <Text style={styles.usertxt}>{this.state.nickname}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Text style={styles.nickname}>{'Change Nickname'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraview}>
          <Text style={styles.description}>{'Tap the camera icon to report a Burka.'}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('TakePicture')}>
            <Image source={require('../../../images/camera-transparent-bg.png')} style={styles.camera} />
          </TouchableOpacity>
        </View>
        <View style={{flex:0.8}}>
          <ScrollView style={styles.list}>
            <List>
              <ListItem icon>
                <Left>
                </Left>
                <Body>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Text></Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                </Left>
                <Body>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Map')}>
                    <Text>Map</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Text></Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                </Left>
                <Body>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Gallery')}>
                    <Text>Gallery</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Text></Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                </Left>
                <Body>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Leaders')}>
                    <Text>Leaderboards</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Text></Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                </Left>
                <Body>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Terms')}>
                    <Text>Terms & Conditions</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Text></Text>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
