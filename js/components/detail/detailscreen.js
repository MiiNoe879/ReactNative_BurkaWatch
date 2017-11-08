import React, { Component } from 'react';
import { Container, Header, Content, 
    Form, Item, Input, Label, Left, Right, Body, 
    Title, Button, Footer, FooterTab, View, 
    List, ListItem, Segment, 
    TouchableOpacity, 
    Text,CheckBox,Icon, Spinner} from 'native-base';
import styles from "./styles";
import { Image, AsyncStorage, Alert } from "react-native";
import Overlay from 'react-native-modal-overlay';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';

var helpers = require('../../utils/helpers');

export default class Detail extends Component {
    constructor(props) {
        super(props)
        const {state} = this.props.navigation
        var id = state.params ? state.params.id : "<undefined>"
        var seg = state.params ? state.params.seg : "<undefined>"
        this.state = {
            id: id,
            seg: seg,
            image: {location: ' ', description: ' '},
            isvisiblereportdialog: false,
            isloading: false,
            reason1: false,
            reason2: false,
            reason3: false,
            reason: 0,
            editable: true
        }
        
        this.removeImage = this.removeImage.bind(this)
        this.saveImage = this.saveImage.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.onChangeReason = this.onChangeReason.bind(this)
        this.onReport = this.onReport.bind(this)
    }
    
    componentDidMount(){
        if(this.state.seg==1 || this.state.seg==3)
            this.setState({editable: false})
        AsyncStorage.getItem('token', (err, result) => {
            helpers.getBurkaDetail(result,this.state.id)
            .then(function(data){
                data = data.data
                image = data.image
                if(!image.s3_path)
                    image.s3_path = ''
                this.setState({
                    image: image
                })
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
            }.bind(this));
        })
    }

    removeImage() {
        AsyncStorage.getItem('token', (err, result) => {
            this.setState({isloading: true})
            helpers.removeImage(result,this.state.image.id)
            .then(function(data){
                this.setState({isloading: false})
                this.goBack()
            }.bind(this))
            .catch(function (error) {
                this.setState({isloading: false})
                setTimeout(function(){
                    alert('Error')
                },1000)
            }.bind(this));
        })
    }

    saveImage() {
        if(this.state.image.description==''){
            alert('Please input description.')
            return
        }
        this.setState({isloading: true})
        AsyncStorage.getItem('token', (err, result) => {
            helpers.updateImage(result,this.state.image)
            .then(function(data){
                console.log(data)
                this.setState({isloading: false})
                this.goBack()
            }.bind(this))
            .catch(function (error) {
                this.setState({isloading: false})
                setTimeout(function(){
                    alert('Error')
                },1000)
            }.bind(this));
        })
    }

    showOverlay() {
        this.setState({isvisiblereportdialog: true})
    }

    hideOverlay() {
        this.setState({isvisiblereportdialog: false})
    }

    onChangeDescription(value) {
        image = this.state.image
        image.description = value
        this.setState({ image: image })
    }

    onChangeLocation(value) {
        image = this.state.image
        image.location = value
        this.setState({ image: image })
    }

    onChangeReason(value){
        this.setState({
            reason: value,
            reason1: false,
            reason2: false,
            reason3: false
        })
        if(value==1)
            this.setState({reason1:true})
        else if(value==2)
            this.setState({reason2:true})
        else if(value==3)
            this.setState({reason3:true})
    }

    onReport(){
        reason = ''
        if(this.state.reason==0){
            alert('Please select reason')
            return
        }
        else if(this.state.reason==1){
            reason = 'This is not a burka'
        }
        else if(this.state.reason==2){
            reason = 'Another option'
        }
        else if(this.state.reason==3){
            reason = 'Third option'
        }

        AsyncStorage.getItem('token', (err, result) => {
            helpers.reportImage(result,this.state.id,reason)
            .then(function(data){
                
            }.bind(this))
            .catch(function (error) {
                alert('Connection Error')
            }.bind(this));
        })
            
        this.hideOverlay()
    }

    goBack() {
        console.log(this.state)
        if(this.state.seg==3)
            this.props.navigation.navigate("Map")
        else
            this.props.navigation.navigate("Gallery")
    }

    render() {
        let buttonView = <View><Button small full danger style={styles.button} onPress={() => this.removeImage()}><Icon name='trash' /><Text>Delete</Text></Button><Button small full success style={styles.button_bottom} onPress={() => this.saveImage()}><Text>Save</Text></Button></View>

        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={this.goBack.bind(this)}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Burka Details</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                <Overlay visible={this.state.isloading} closeOnTouchOutside animationType="fade"
                containerStyle={styles.overlay} childrenWrapperStyle={styles.overlayChildren} >
                    <Spinner color='grey' />
                </Overlay>
                <Overlay visible={this.state.isvisiblereportdialog} closeOnTouchOutside animationType="fade"
                containerStyle={styles.overlay} childrenWrapperStyle={styles.overlayChildren} >
                    <Text style={styles.overlayTitle}>Report this Burka</Text>
                    <Text style={styles.overlayDescription}>Please choose an Option below</Text>
                    <List style={styles.optionslist}>
                        <ListItem style={styles.optionitem} >
                            <Text style={styles.optiontext}>This is not a Burka</Text>
                            <CheckBox checked={this.state.reason1} color='#c52605' onPress={() => this.onChangeReason(1)}/>
                        </ListItem>
                        <ListItem style={styles.optionitem} >
                            <Text style={styles.optiontext}>Another option</Text>
                            <CheckBox checked={this.state.reason2} color='#c52605' onPress={() => this.onChangeReason(2)}/>
                        </ListItem>
                        <ListItem style={styles.optionitem} >
                            <Text style={styles.optiontext}>Third option</Text>
                            <CheckBox checked={this.state.reason3} color='#c52605' onPress={() => this.onChangeReason(3)}/>
                        </ListItem>
                    </List>
                    <View style={styles.overlaybuttongroup}>
                        <Button bordered style={styles.overlaybutton} onPress={() => this.hideOverlay()}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button bordered style={styles.overlaybutton} onPress={() => this.onReport()}>
                            <Text>OK</Text>
                        </Button>
                    </View>
                </Overlay>
                <View style={styles.detailview}>
                    <Text style={styles.details}>Details</Text>
                    <IconMaterial name='report' style={{fontSize: 30,color:'#c52605'}} onPress={this.showOverlay.bind(this)}/>
                </View>
                <View style={styles.descriptionview}>
                    <Text style={styles.description}>You can update and change infos of your Burkas</Text>
                </View>
                <Image source={{uri:this.state.image.s3_path}} style={styles.burka} />
                <Form>
                    <Item floatingLabel style={styles.formfield}>
                    <Label>Description</Label>
                    <Input value={this.state.image.description} editable={this.state.image.mine} onChangeText={(value) => this.onChangeDescription(value)}/>
                    </Item>
                    <Item floatingLabel style={styles.formfield}>
                    <Label>Location</Label>
                    <Input value={this.state.image.location} editable={false} onChangeText={(value) => this.onChangeLocation(value)}/>
                    </Item>
                    <View>
                    {
                        this.state.image.mine
                            ? 
                                buttonView
                            : 
                            <View />
                    }
                        
                    </View>
                </Form>
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