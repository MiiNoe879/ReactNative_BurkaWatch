const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
    container: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 30
    },
    logoview: {
        width: 120,
        height: 70,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 30,
        fontSize: 10
    },
    camera: {
        marginTop: 20,
        width: 70,
        height: 70
    }
};