import React, { Component } from "react";
import { Image, Alert, TextInput, AsyncStorage } from "react-native";
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
var helpers = require('../../utils/helpers');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    
    this.state = {
      pincode: '',
      loading: false
    };
    this.login = this.login.bind(this)
  }

  login() {
    if(this.state.pincode){
      this.setState({
        loading: true
      });
      AsyncStorage.getItem('phonenumber', (err, result) => {
        helpers.login(result, this.state.pincode)
        .then(function(data){
          this.setState({
            loading: false
          });
          data = data.data;
          if(data.code==200){
            AsyncStorage.setItem('token', data.token);
            this.props.navigation.navigate("Home")
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
      });
    }
    else{
      Alert.alert(
        'Warning',
        'Please Input Pincode',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }
  
  componentDidMount(){
    
  }

  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../../images/logo.png')} style={styles.logo}/>
        <View style={{marginTop: -30}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.description}>{'Report & Explore Burkas'}</Text>
            <Text style={styles.description}>{'in your neighborhood.'}</Text>
          </View>
          <View style={{marginTop: -20}}>
            <Text style={styles.phonenumber}>{'Please enter the Code we just sent you.'}</Text>
            <TextInput ref='pincode' style={styles.phonenumberfield}
              onChangeText={(value) => this.setState({pincode: value})}
              value={this.state.pincode} keyboardType={'numeric'}
            />
          </View>
        </View>
        {
          !this.state.loading
          &&
          <Button block danger style={styles.submit} onPress={this.login}><Text> Submit </Text></Button>
        }
        {
            this.state.loading
            &&
            <Spinner color='red' style={styles.loading}  visible={this.state.loading}/>
        }
        <View style={styles.bg}>
          <Image source={require('../../../images/burka.png')} style={styles.burka}/>
        </View>
      </Container>
    );
  }
}
const LoginSwag = reduxForm(
  {
    form: "test",
    //validate
  },
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
