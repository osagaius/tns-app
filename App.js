import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Image, Button } from 'react-native';
import { LinearGradient } from "expo";

export default class App extends Component {
  state = {
    email: "",
    password: "",
    errors:[]
  };

  _handlePasswordChange = password => {
    this.setState({errors: []})
    this.setState({ password });
  };

  _handleEmailChange = email => {
    this.setState({errors: []})
    this.setState({ email });
  };

  _handleButtonPress = () => {

    var errors = this.state.errors;

    const substring = "@tnsatlanta.org";
    var email = String.prototype.trim.call(this.state.email);
    if (!email.includes(substring)) {
      var newError = "Email is invalid";
      errors = errors.concat(newError);
    }

    var password = this.state.password;
    if (password.length < 8) {
      var newError = "Password is too short";
      errors = errors.concat(newError);
    }

    this.setState({errors: errors});
  };

  emailIsValid = (email) => {
    var substring = "@tnsatlanta.org";
    email.includes(substring);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'http://tnsatlanta.org/wp-content/themes/tns-sixteen/images/logo.png' }}
          style={{ height: 200, width: 200 }}
        />

        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={this._handleEmailChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />

        <TextInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
          style={{ width: 200, height: 44, padding: 8 }}
        />

        <Button
          onPress={this._handleButtonPress}
          title="Sign In"
        />

        <View>
          {this.state.errors.map(error => <Text style={styles.errorText}>{error}</Text>)}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  errorText: {
    color: 'red',
  },
});
