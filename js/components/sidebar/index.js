import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { AppRegistry, Image, StatusBar, TouchableOpacity } from "react-native";
import { Container, Content, Text, List, ListItem, View } from "native-base";
import styles from "./styles";
const routes = [{text:"Home",value:"Home"}, {text:"Profile",value:"Profile"}, {text:"Map",value:"Map"}, {text:"Gallery",value:"Gallery"}, {text:"Leaders", value:"Leaders"}, {text:"Terms & Conditions",value:"Terms"}];

class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>  
            <Image
                source={require('../../../images/logo.png')}
                style={styles.logoview}
            />
            <Text style={styles.text}>Tap the Camera Icon to report a Burka.</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("TakePicture")}>
              <Image source={require('../../../images/camera-transparent-bg.png')} style={styles.camera} />
            </TouchableOpacity>
          </View>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.value)}>
                  <Text>{data.text}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const SideBarSwag = reduxForm(
  {
    form: "test",
  },
)(SideBar);
SideBarSwag.navigationOptions = {
  header: null
};
export default SideBarSwag;