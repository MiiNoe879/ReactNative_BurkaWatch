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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    col: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    burka: {
        width: deviceWidth,
        height: deviceHeight/4,
        resizeMode: 'contain',
        marginTop: 20
    },
    txtlocation: {
        fontSize: 13,
        fontFamily: "OpenSans-Light",
    },
    txtdate: {
        fontSize: 10
    },
    footer: {
        backgroundColor: '#FFFFFF'
    },
    detailview: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10
    },
    descriptionview:{
        alignSelf: "stretch",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10
    },
    description: {
        fontSize: 15,
        fontFamily: "OpenSans-Light",
    },
    button: {
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        borderRadius: 4
    },
    formfield: {
        marginRight: 20,
        marginLeft: 20
    },
    overlay:{
        backgroundColor: 'rgba(0, 0, 0, 0.78)'
    },
    overlayChildren: {
        backgroundColor: '#fff',
        borderRadius: 10
    },
    overlayTitle: {
        fontWeight:'300',
        fontSize: 15
    },
    overlayDescription: {
        fontWeight:'300',
        fontSize: 12,
        paddingTop: 10,
        textAlign:'center'
    },
    optionslist: {
        paddingTop: 20
    },
    optionitem: {
        width: deviceWidth-80,
        justifyContent: 'space-between'
    },
    optiontext: {
        color: '#c52605',
        fontSize: 13,
        fontWeight: '100'
    },
    overlaybuttongroup: {
        flexDirection: 'row',
        paddingTop: 20
    },
    overlaybutton: {
        width: 100,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    }
};