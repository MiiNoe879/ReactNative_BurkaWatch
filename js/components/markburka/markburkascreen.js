import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View, Body, Left, Right, Title } from 'native-base';

import styles from "./styles";
import { Field, reduxForm } from "redux-form";
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from "react-redux";

import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

class MarkBurka extends Component {
  constructor(props) {
    super(props);
    const {state} = this.props.navigation
    var imageData = state.params ? state.params.imageData : "<undefined>"
    this.state = {
        imageData: imageData
      };
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentDidMount() {
    Orientation.lockToPortrait()
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00922*1.5*ASPECT_RATIO
      }
      this.setState({
        mapRegion: region,
        lastLat: position.coords.latitude,
        lastLong: position.coords.longitude
      })
      //console.log(position)
      //this.onRegionChange(region, position.coords.latitude, position.coords.longitude);
      
    });
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, lastLat, lastLong) {
    console.log(region)
    /*this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });*/
  }

  onDragEnd(e) {
    console.log(e);
    this.setState({
        lastLat: e.nativeEvent.coordinate.latitude,
        lastLong:e.nativeEvent.coordinate.longitude
    })
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <MapView
              style={styles.mapview}
              liteMode
              initialRegion={this.state.mapRegion}
              showsUserLocation={true}
              followUserLocation={false}
              //onRegionChange={this.onRegionChange}
              onRegionChange={region => this.onRegionChange(region)}
          >
            <MapView.Marker
                coordinate={{
                    latitude: this.state.lastLat,
                    longitude: this.state.lastLong,
                }}
                //onSelect={(e) => console.log('onSelect', e)}
                //onDrag={(e) => this.onDragEnd.bind(this)}
                //onDragStart={(e) => console.log('onDragStart', e)}
                onDragEnd={(e) => this.onDragEnd(e)}
                //onPress={(e) => console.log('onPress', e)}
                draggable
            />
          </MapView>
          <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#ce2803' }}
                  position="bottomRight"
                  onPress={() => this.props.navigation.navigate('EditBurka',{imageData: this.state.imageData,lat:this.state.lastLat, lon:this.state.lastLong})}>
                  <Icon name="flag" />
          </Fab>
        </View>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="ios-compass" />
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
const MarkBurkaSwag = reduxForm(
  {
    form: "map"
  }
)(MarkBurka);
MarkBurkaSwag.navigationOptions = {
  header: null
};
export default MarkBurkaSwag;