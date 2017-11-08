import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import {
  Container
} from "native-base";
import Camera from 'react-native-camera';
import styles from "./styles";
import { Field, reduxForm } from "redux-form";

import Orientation from 'react-native-orientation-locker';

class TakePicture extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };
    
    this.gotoMarkBurka = this.gotoMarkBurka.bind(this)
  }

  componentDidMount() {
    Orientation.unlockAllOrientations()
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
  }

  gotoMarkBurka(data){
    this.props.navigation.navigate("MarkBurka",{imageData: data})
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => this.gotoMarkBurka(data))
        .catch(err => console.error(err));
      //this.props.navigation.goBack();
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  stopCapture = () => {
    this.props.navigation.goBack();
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../../../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../../../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../../../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../../../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../../../assets/ic_flash_off_white.png');
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
            >
              <Image
                  source={require('../../../assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
            <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopCapture}
            >
              <Image
                    source={require('../../../assets/ic_close.png')}
              />
            </TouchableOpacity>
          {/*
              !this.state.isRecording
              &&
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.startRecording}
              >
                <Image
                    source={require('../../../assets/ic_videocam_36pt.png')}
                />
              </TouchableOpacity>
              ||
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopRecording}
              >
                <Image
                    source={require('../../../assets/ic_stop_36pt.png')}
                />
              </TouchableOpacity>
          */}
        </View>
      </View>
    );
  }
}
const TakePictureSwag = reduxForm(
  {
    form: "test"
  }
)(TakePicture);
TakePictureSwag.navigationOptions = {
  header: null
};
export default TakePictureSwag;