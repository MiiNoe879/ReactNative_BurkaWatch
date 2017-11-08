import React, { Component } from "react";
import { Image, Alert, AsyncStorage, Keyboard } from "react-native";
import { connect } from "react-redux";
import { Spinner } from "native-base";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import dismissKeyboard from 'react-native-dismiss-keyboard';
var helpers = require('../../utils/helpers');

class Signup extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    
    this.state = {
      phonenumber: '',
      loading: false
    };
    this.onPressFlag = this.onPressFlag.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.singup = this.signup.bind(this)
    this.state = {
        cca2: 'US'
    };
  }

  signup() {
    if(this.refs.phone.isValidNumber()){
      this.setState({
        loading: true
      });
      helpers.signup(this.state.phonenumber)
      .then(function(data){
        this.setState({
          loading: false
        });
        data = data.data;
        if(data.code==200){
          AsyncStorage.setItem('phonenumber', this.state.phonenumber)
          this.props.navigation.navigate("Login")
          /*Alert.alert(
            'Success',
            data.message,
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate("Login")}
            ],
            { cancelable: false }
          )*/
        } else{
          Alert.alert(
            'Failure',
            data.message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        this.setState({
          loading: false
        });
        Alert.alert(
          'Error',
          'Connection Error',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }.bind(this));
    }
    else{
      Alert.alert(
        'Error',
        'Invalid Phone Number',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }
  
  componentDidMount(){
    this.setState({
        pickerData: this.refs.phone.getPickerData()
    })
    //this.props.navigation.navigate("Login")
    AsyncStorage.getItem('token', (err, result) => {
      if(result)
       this.props.navigation.navigate("Home")
    });
    
  }
  onPressFlag(){
    this.refs.countryPicker.openModal()
  }
  selectCountry(country){
    this.refs.phone.selectCountry(country.cca2.toLowerCase())
    this.setState({cca2: country.cca2})
  }  
  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../../images/logo.png')} style={styles.logo}/>
        <View style={{marginTop: -60}}>
          <View>
            <Text style={styles.description}>{'Report & Explore Burkas'}</Text>
            <Text style={styles.description}>{'in your neighborhood.'}</Text>
          </View>
          <Text style={styles.phonenumber}>{'Please enter your Phone Nr.'}</Text>
          
          <View  style={styles.phoneinputview}>
            <PhoneInput ref='phone' style={styles.phonenumberfield} onPressFlag={this.onPressFlag}
              onChangePhoneNumber={(value) => this.setState({phonenumber: value})}
              value={this.state.phonenumber}
            />
          </View>
        </View>
        {
          !this.state.loading
          &&
          <Button block danger style={styles.submit} onPress={this.singup}><Text> Submit </Text></Button>
        }
        {
            this.state.loading
            &&
            <Spinner color='red' style={styles.loading}  visible={this.state.loading}/>
        }
        <View style={styles.bg}>
          <Image source={require('../../../images/burka.png')} style={styles.burka}/>
        </View>
        <CountryPicker
            ref='countryPicker'
            onChange={(value)=> this.selectCountry(value)}
            translation='eng'
            cca2={this.state.cca2}
        >
          <View></View>
        </CountryPicker>
        
      </Container>
    );
  }
}
const SignupSwag = reduxForm(
  {
    form: "test",
    //validate
  },
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Signup);
SignupSwag.navigationOptions = {
  header: null
};
export default SignupSwag;
