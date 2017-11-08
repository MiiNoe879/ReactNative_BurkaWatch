import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Body, Title, Button, Text, Footer, FooterTab, Icon, View } from 'native-base';
import { Field, reduxForm } from "redux-form";
import { AsyncStorage, Alert } from "react-native";
import styles from "./styles";
var helpers = require('../../utils/helpers');

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nickname: ' ',
        phonenumber: ' ',
        burkacount: ' '

    };
    this.updateuser = this.updateuser.bind(this)
  }

  updateuser(){
    this.setState({
      loading: true
    });
    AsyncStorage.getItem('token', (err, result) => {
      helpers.updateuserinfo(result,this.state.nickname)
      .then(function(data){
        data = data.data;
        if(data.code==200){
          userinfo = {}
          userinfo.nickname = this.state.nickname
          userinfo.phonenumber = this.state.phonenumber
          userinfo.burkacount = this.state.count
          AsyncStorage.setItem('userinfo',JSON.stringify(userinfo))
          this.props.navigation.navigate("Home")
        } else{
          alert("Error")
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

  componentDidMount(){
    /*AsyncStorage.getItem('userinfo', (err,result) => {
      if(result){
        userinfo = JSON.parse(result);
        this.setState({
          nickname: userinfo.nickname,
          phonenumber: userinfo.phonenumber,
          burkacount: userinfo.count+''
        });
      }
    });*/
    AsyncStorage.getItem('token', (err, result) => {
      helpers.getuserinfo(result)
      .then(function(data){
        this.setState({
          loading: false
        });
        data = data.data;
        if(data.code){
          alert("Failure")
        } else{
          this.setState({
            nickname: data.user.nickname,
            phonenumber: data.user.phonenumber,
            burkacount: data.user.count+''
          });
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

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.updateuser}>
                <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nickname</Label>
              <Input ref='nickname' value={this.state.nickname} onChangeText={(value) => this.setState({nickname: value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Phone Number</Label>
              <Input editable={false} value={this.state.phonenumber}/>
            </Item>
            <Item floatingLabel >
              <Label>Burkas Reported</Label>
              <Input editable={false} value={this.state.burkacount}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
              <Icon name="ios-compass-outline" />
              <Text style={[styles.tabtext, styles.active]}>Map</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Gallery')}>
              <Icon name="ios-images-outline"/>
              <Text style={styles.tabtext}>Gallery</Text>
            </Button>
            <Button vertical active>
              <Icon active name="contact" />
              <Text style={styles.tabtext}>Profile</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Leaders')}>
              <Icon name="ios-trophy-outline"/>
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

const ProfileSwag = reduxForm(
  {
    form: "test",
    //validate
  },
  function bindActions(dispatch) {
    return {
    };
  }
)(ProfileScreen);
ProfileSwag.navigationOptions = {
  //header: null
};
export default ProfileSwag;