'use strict';

import _apTheme from 'react-native-theme';
import React, { Component, StyleSheet, Text, View } from 'react-native';

class Lib extends Component {
  render() {
    return <View style={[_apTheme.styles.body, styles.container]}>
        <Text style={[_apTheme.styles.strong, styles.header, styles.intent]}>
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text style={_apTheme.styles.instructions}>
        </Text>
        <Text style={[_apTheme.styles.instructions, { color: 'red' }]}>
        </Text>
      {this.props.results.map(function (result) {
        return <Text style={_apTheme.css('result-' + result.id)}>{result.text}</Text>;
      })}
        <Text style={_apTheme.css([this.props.status])}>
        </Text>
        <Text style={[_apTheme.css(this.props.status), { color: 'black' }]}>
        </Text>
      </View>;
  }
}

module.exports = Lib;
