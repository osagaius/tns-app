import React, { Component } from 'react';
import { Text, View, TextInput, Alert, Image, Button } from 'react-native';
import Firebase from 'firebase';
import { Location, Permissions } from 'expo';
import GeoPoint from 'geopoint';

export class HomeScreen extends Component {
  state = {
    location: {}
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  locationIsValid() {
    const TNS_LAT = 33.746416;
    const TNS_LONG = -84.365960;
    const tnsLocation = new GeoPoint(TNS_LAT, TNS_LONG);
    const MAX_DISTANCE = 20.1;

    let {location} = this.state;
    if (location && location.coords) {
      let {coords} = location;
      let currentPoint = new GeoPoint(coords.latitude, coords.longitude);

      if (tnsLocation.distanceTo(currentPoint) < MAX_DISTANCE) {
        return true;
      }
    }
    return false;
  }

  _handleButtonPress() {
    var userId = Firebase.auth().currentUser.uid;

    this.setState({checkedIn: true});
    Firebase.database().ref('users/' + userId).set({
      checkedIn: true,
      lastCheckIn: + new Date()
    });
  }

  renderButton() {
    if (this.locationIsValid()) {
      if (this.state.checkedIn === true) {
        return <Text>Hooray! You're checked in.</Text>;
      }
      return <Button onPress={this._handleButtonPress.bind(this)} title="Check In"></Button>;
    } else {
      return <Text>Oops! Looks like you're not on campus. Try again later.</Text>;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.renderButton()}
      </View>
    )
  }
}

export default HomeScreen;
