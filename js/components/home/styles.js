
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    //flex: 1,
    //alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  logo: {
    //flex: 0.2,
    width: deviceWidth/4,
    height: deviceWidth/4/2290*1169,
    resizeMode: 'contain',
    //backgroundColor: '#FFFF00',
  },
  welcomeview: {
    width: deviceWidth,
    //flex: 0.2,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,
    marginBottom: 30
  },
  welcometxt: {
    fontSize: 30,
    fontFamily: "OpenSans-Light",
  },
  usertxt: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
  },
  nickname: {
    fontSize: 13,
    fontFamily: "OpenSans-Light",
  },
  cameraview: {
    width: deviceWidth,
    //flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#FF0000'
  },
  nicknametouchview: {
    backgroundColor: '#FF0000'
  },
  cameratouchview: {
    backgroundColor: '#FF0000'
  },
  cameratouch: {
    //backgroundColor: '#00FF00',
    //flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 13,
    fontFamily: "OpenSans-Light",
  },
  camera: {
    width: deviceWidth/6,
    height: deviceWidth/6,
    resizeMode: 'contain',
    marginTop: 15
  },
  list: {
    //flex: 0.3,
    width: deviceWidth
  }
};
