const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
    container: {
        flex: 1,
    },
    mapview: {
        flex: 1,
        width: deviceWidth,
        height: deviceHeight
    },
    tabtext: {
        fontSize: 10,
        height: 25
    },
    active: {
    }
};