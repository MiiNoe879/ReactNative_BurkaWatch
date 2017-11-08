const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
    container: {
        backgroundColor: '#FFFFFF'
    },
    header: {
        backgroundColor: '#FFFFFF'
    },
    tabtext: {
        fontSize: 10,
        height: 25
    },
    description: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30
    },
    rowview: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexstart: {
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: "OpenSans-Light",
    },
    textbold: {
        fontFamily: "OpenSans-Bold",
    },
    textnumber: {
        fontFamily: "OpenSans-Light",
        color: '#cc2b01'
    },
    texttime: {
        marginTop: 20,
        fontFamily: "OpenSans-Bold",
        fontSize: 20
    },
    listview: {
        marginTop: 0,
        height: deviceHeight*0.6
    },
    no: {
        fontWeight: 'bold',
        fontSize: 13,
        paddingTop: 8,
        paddingBottom: 10,
        color: '#444444',
        paddingLeft: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 13,
        paddingTop: 8,
        paddingBottom: 10,
        paddingLeft: 10,
        color: '#444444',
      },
      message: {
        fontSize: 13,
        paddingTop: 8,
        paddingBottom: 10,
        color: '#c52605',
        fontWeight: '200',
      },
      time: {
        fontSize: 11,
        color: '#999999',
        fontWeight: '200',
      },
      devider: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 0.5,
        backgroundColor: '#C8C8C8',
      },
      body: {
        flex: 1,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
      },
      mainbody: {
        flexDirection: 'row'
      }
};