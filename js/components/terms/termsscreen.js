import React, { Component } from 'react';
import { Container, Header, Content, 
    Form, Item, Input, Label, Left, Right, Body, 
    Title, Button, Footer, FooterTab, Icon,View, 
    List, ListItem, Segment, 
    TouchableOpacity, 
    Text,CheckBox} from 'native-base';
import styles from "./styles";
import { Image, AsyncStorage, Alert } from "react-native";
import Overlay from 'react-native-modal-overlay';

var helpers = require('../../utils/helpers');

export default class TermsScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        
    }

    render() {
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    
                </Left>
                <Body>
                    <Title>Terms & Conditions</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content style={styles.detailview}>
                <Text>Terms and Conditions</Text>
            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => this.props.navigation.navigate('Map')}>
                        <Icon name="ios-compass-outline" />
                        <Text style={[styles.tabtext, styles.active]}>Map</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Gallery')}>
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