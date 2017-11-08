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
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    col: {
        marginLeft: 5,
        marginRight: 5
    },
    burka: {
        width: (deviceWidth-30)/2,
        height: (deviceWidth-30)/2,
        resizeMode: 'contain',
        borderRadius: 40
    },
    txtlocation: {
        fontSize: 13,
        textAlign: 'center',
        width:(deviceWidth-30)/2,
    },
    txtdate: {
        fontSize: 10,
        textAlign: 'center'
    },
    footer: {
        backgroundColor: '#FFFFFF'
    },
    scrollView: {
        height: deviceHeight-174
    }
};