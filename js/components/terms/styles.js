const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
    container: {
        backgroundColor: '#FFFFFF'
    },
    tabtext: {
        fontSize: 10,
        height: 25
    },
    header: {
        backgroundColor: '#FFFFFF'
    },
    
    footer: {
        backgroundColor: '#FFFFFF'
    },
    detailview: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    
};