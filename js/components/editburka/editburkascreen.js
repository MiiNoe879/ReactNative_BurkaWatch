import React, { Component } from 'react';
import { Container, Header, Content, 
    Form, Item, Input, Label, Left, Right, Body, 
    Title, Button, Footer, FooterTab, Icon,View, 
    List, ListItem, Segment, 
    TouchableOpacity, 
    Text,CheckBox, Spinner} from 'native-base';
import styles from "./styles";
import { Image, AsyncStorage, Alert } from "react-native";
import Overlay from 'react-native-modal-overlay';
import Geocoder from 'react-native-geocoder';
import ImageResizer from 'react-native-image-resizer';

var helpers = require('../../utils/helpers');

export default class EditBurka extends Component {
    constructor(props) {
        super(props)
        const {state} = this.props.navigation
        var imageData = state.params ? state.params.imageData : "<undefined>"
        var lat = state.params ? state.params.lat : "<undefined>"
        var lon = state.params ? state.params.lon : "<undefined>"
        this.state = {
            imageData: imageData,
            lat: lat,
            lon: lon,
            description: ' ',
            location: ' ',
            isloading: false,
            filename: ''
        }
        
        this.saveImage = this.saveImage.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeLocation = this.onChangeLocation.bind(this)
        this.sendFile = this.sendFile.bind(this)
        this.onComplete = this.onComplete.bind(this)

        this.resizeImage = this.resizeImage.bind(this)
        this.onGetImageSizeComplete = this.onGetImageSizeComplete.bind(this)
        this.onCreateResizeImageComplete = this.onCreateResizeImageComplete.bind(this)
    }

    resizeImage() {
        let path = this.state.imageData.path
        Image.getSize(path,this.onGetImageSizeComplete,
            function(){
                alert('Get Image Size Error')
        })
    }

    onGetImageSizeComplete(width,height) {
        ImageResizer.createResizedImage(this.state.imageData.path, 800, 800/width*height, "JPEG", 50, 0).then((response) => {
            console.log(response)
            this.onCreateResizeImageComplete(response.uri)
        }).catch((err) => {
            console.log(err)
            alert("Resize Error")
        });
    }

    onCreateResizeImageComplete(uri){
        this.state.imageData.path = uri
        
        filename = this.state.filename
        obj = this
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if (this.readyState === 4) {
                console.log("response="+xhr.responseText)
                if (xhr.status === 200) {
                    obj.onComplete(1)
                } else {
                    obj.onComplete(0)
                }
            }
        }
        xhr.open('PUT', presignedUrl)
        //xhr.setRequestHeader('X-Amz-ACL', 'public-read')
        xhr.setRequestHeader('Content-Type', 'image/jpeg')
        xhr.send({ uri: this.state.imageData.path, type: 'image/jpeg', name: filename })
    }

    componentDidMount() {
        Geocoder.geocodePosition({lat:this.state.lat,lng:this.state.lon}).then(res => {
            console.log(res)
            this.setState({
                location: res[0].streetName+', '+res[0].locality
                //location: res[0].formattedAddress
            })
        })
        .catch(err => console.log(err))
    }

    onComplete(status) {
        this.setState({
            isloading: true
        })
        if(status==1){//s3 upload success
            AsyncStorage.getItem('token', (err, result) => {
                helpers.saveImage(result, this.state.description, this.state.location, this.state.lat, this.state.lon, this.state.s3_path)
                .then(function(data){
                    this.setState({
                        isloading: false
                    })
                    console.log('success')
                    this.props.navigation.navigate("Map")
                }.bind(this))
                .catch(function (error) {
                    this.setState({
                        isloading: false
                    })
                    console.log(error)
                }.bind(this));
            })
        }
        else{
            alert('S3 upload failed!')
        }
    }
    
    sendFile() {
        this.setState({
            isloading: true
        })
        helpers.fileUpload(presignedUrl,file)
        .then(function(data){
            this.setState({
                isloading: false
            })
            /*if(data.status==200){
                alert('Success')
            }
            else{
                alert("Fail")
            }*/
            console.log(data)
        }.bind(this))
        .catch(function(error){
            this.setState({
                isloading: false
            })        
        }.bind(this))
    }

    saveImage() {
        if(this.state.description==''||this.state.location==''){
            alert('You have to insert description.')
            return
        }
            
        AsyncStorage.getItem('token', (err, result) => {
            var d = new Date()
            var filename = d.getTime()
            filename = filename+".jpg"
            this.setState({filename: filename})

            this.setState({
                isloading: true
            })
            helpers.uploadRequest(result, filename)
            .then(function(data){
                data = data.data
                presignedUrl = data.endpoint_url
                console.log("presignedURL = "+presignedUrl)
                splits = presignedUrl.split("?")
                this.setState({
                    s3_path: splits[0]
                })
                this.resizeImage()
                
            }.bind(this))
            .catch(function (error) {
                this.setState({
                    isloading: false
                })
            }.bind(this));
        })
    }

    onChangeDescription(value) {
        this.setState({ description: value })
    }

    onChangeLocation(value) {
        this.setState({ location: value })
    }

    render() {
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.navigate("MarkBurka",{imageData: this.state.imageData})}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Edit Burka</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                <Overlay visible={this.state.isloading} closeOnTouchOutside animationType="fade"
                containerStyle={styles.overlay} childrenWrapperStyle={styles.overlayChildren} >
                    <Spinner color='grey' />
                </Overlay>
                <View style={styles.detailview}>
                    <Text style={styles.details}>Details</Text>
                </View>
                <View style={styles.descriptionview}>
                    <Text style={styles.description}>Review your Burka Mark before submitting it. You can also add a brief description.</Text>
                </View>
                <Image source={{uri:this.state.imageData.path}} style={styles.burka} />
                <Form>
                    <Item floatingLabel style={styles.formfield}>
                    <Label>Description</Label>
                    <Input value={this.state.description} onChangeText={(value) => this.onChangeDescription(value)}/>
                    </Item>
                    <Item floatingLabel style={styles.formfield}>
                    <Label>Location</Label>
                    <Input value={this.state.location} onChangeText={(value) => this.onChangeLocation(value)}/>
                    </Item>
                    <View>
                        <Button small full success style={styles.button} onPress={() => this.saveImage()}><Text>Save</Text></Button>
                    </View>
                </Form>
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