
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 0
  },
  logo: {
    flex: 0.4,
    width: deviceWidth/2,
    resizeMode: 'contain',
    marginTop: -30
    //backgroundColor: '#FFFF00',
  },
  bg: {
    flex: 0.5,
    alignSelf: "flex-end",
    justifyContent: 'flex-end',
    //backgroundColor: '#FFFF00',
  },
  burka: {
    flex: 1.1,
    width: deviceWidth/2,
    resizeMode: 'contain',
    alignSelf: "flex-end",
    //backgroundColor: '#FF0000',
    bottom: -45 
  },
  description: {
    fontFamily: "OpenSans-Light",
    fontSize: 16,
    textAlign: "center",
    color: '#bd7461',
  },
  phonenumber: {
    fontFamily: "OpenSans-Light",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10
  },
  phonenumberfield: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5
    //color: '#b33110'
  },
  loading: {
    height: 40,
    flex: 0.05,
    marginTop: 20,
  },
  submit: {
    height: 40,
    flex: 0.05,
    width: deviceWidth/2,
    marginTop: 10,
    marginLeft: deviceWidth/4
  },
  phoneinputview: {
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#b33110',
  },
};
