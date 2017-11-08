import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View, Body, Left, Right, Title } from 'native-base';

import styles from "./styles";
import { Field, reduxForm } from "redux-form";
import MapView from 'react-native-maps';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { connect } from "react-redux";

var helpers = require('../../utils/helpers');

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SAMPLE_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
import supercluster from 'supercluster';
import Promise from 'bluebird';
import Marker from './components/Marker';
import Points from '../../../assets/Points.json';

class Map extends Component {

  state = {
    mapLock: false
  }

  setRegion(region) {
    if(Array.isArray(region)) {
      region.map(function(element) { 
        if (element.hasOwnProperty("latitudeDelta") && element.hasOwnProperty("longitudeDelta")) {
          region = element;
          return;
        }
      })
    }
    if (!Array.isArray(region)) {
      this.setState({
        region: region
      });
    } else {
      console.log("We can't set the region as an array");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      active: 'false'
    };
    this._createCluster.bind(this)
    this._convertPoints.bind(this)
    this._getZoomLevel.bind(this)
    this._createRegions.bind(this)

    this.createMarkersForRegion_Places.bind(this)
    this.onChangeRegionComplete.bind(this)
    this.onChangeRegion.bind(this)
  }

  _createCluster(data) {
    const index = supercluster({
      radius: 60,
      maxZoom: 15, // Default: 16     
      nodeSize: 128, 
    });
    index.load(data.features);
    return index;
  }

  _convertPoints(data) {
    data = data.data
    data = data.images
    const results = {
      type: 'MapCollection',
      features: [],
    };
    index = 0
    data.map((value, key) => {
      index++
      array = {
        type: 'Feature',
        properties: {
          _id: value.id,
          index: index,
          featureclass: "A",
          name: value.location,
          lat_x: value.lat,
          long_x: value.lon,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            value.lon,
            value.lat,
          ],
        },
      };
      results.features.push(array);
    });
    return results;
  }

  _getZoomLevel(region = this.state.region) {
      const angle = region.longitudeDelta;
      const level = Math.round(Math.log(360 / angle) / Math.LN2);    
      return level;
  }

  _createRegions() {
    const padding = 0;
    const markers = this.state.clusters.getClusters([
      this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
      this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
      this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
      this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
    ], this._getZoomLevel());
    return markers.map(marker => this.renderMarkers(marker));
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00922*1.5*ASPECT_RATIO
      }
      this.setState({
        region: region,
        lastLat: position.coords.latitude,
        lastLong: position.coords.longitude
      })
      AsyncStorage.getItem('token', (err, result) => {
        helpers.getAllImages(result)
        .then(function(data){
          props = {}
          props.mapPoints = this._convertPoints(data).features
          this.componentWillReceiveProps(props);  
        }.bind(this))
        .catch(function (error) {
        }.bind(this));
      })
    });
  }

  createMarkersForLocations(props) {
    return {
      places: props.mapPoints
    };
  }


  componentWillReceiveProps(nextProps) {
    const markers = this.createMarkersForLocations(nextProps);
    if (markers && Object.keys(markers)) {
      const clusters = {};
      this.setState({
        mapLock: true
      });
      Object.keys(markers).forEach(categoryKey => {
        // Recalculate cluster trees
        const cluster = supercluster({
          radius: 60,
          maxZoom: 16,
        });

        cluster.load(markers[categoryKey]);

        clusters[categoryKey] = cluster;
      });

      this.setState({
        clusters,
        mapLock: false
      });
    }
  }


  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }


  createMarkersForRegion_Places() {
    const padding = 0.25;
    if (this.state.clusters && this.state.clusters["places"]) {
      const markers = this.state.clusters["places"].getClusters([
        this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
        this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());
      const returnArray = [];
      const { clusters, region } = this.state;
      const onPressMaker = this.onPressMaker.bind(this);
      markers.map(function(element ) {
        returnArray.push(
            <Marker
              key={element.properties._id || element.properties.cluster_id}
              onPress={onPressMaker}
              feature={element}
              clusters={clusters}
              region={region}
            />
        );
      });
      return returnArray;
    }
    return [];
  }


  onPressMaker(data) {
    console.log(data)
    if (data.options.isCluster) {
      if (data.options.region.length > 0) {
        this.goToRegion(data.options.region, 100)
      } else {
        console.log("We can't move to an empty region");
      }
    } else {
      this.props.navigation.navigate('Detail',{id:data.feature.properties._id, seg: 3})
    }
    return;
  }


  goToRegion(region, padding) {
    this.map.fitToCoordinates(region, {
      edgePadding: { top: padding, right: padding, bottom: padding, left: padding },
      animated: true,
    });
  }



  onChangeRegionComplete(region) {
    this.setRegion(region);
    this.setState({
      moving: false,
    });
  }


  onChangeRegion(region) {
    this.setState({
      moving: true,
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <MapView
            ref={ref => { this.map = ref; }}
            style={styles.mapview}
            initialRegion={this.state.region}
            onRegionChange={region =>this.onChangeRegion(region)}
            onRegionChangeComplete={region =>this.onChangeRegionComplete(region)}
          >
            {
              this.createMarkersForRegion_Places()
            }
          </MapView>

          <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#ce2803' }}
                  position="bottomRight"
                  onPress={() => this.props.navigation.navigate('TakePicture')}>
                  <Icon name="camera" />
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
const MapSwag = reduxForm(
  {
    form: "map"
  }
)(Map);
MapSwag.navigationOptions = {
  header: null
};
export default MapSwag;