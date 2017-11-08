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
    phone: {
        marginLeft: 20,
        marginTop: 10
    }
};