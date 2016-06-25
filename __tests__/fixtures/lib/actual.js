'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

class Lib extends Component {
  render() {
    return (
      <View style={styles.container} class="body">
        <Text style={[styles.header, styles.intent]} class="strong">
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text class="instructions">
        </Text>
        <Text class="instructions" style={{color: 'red'}}>
        </Text>
      {this.props.results.map(function(result) {
        return <Text class={'result-' + result.id}>{result.text}</Text>;
      })}
        <Text class={[this.props.status]}>
        </Text>
        <Text class={this.props.status} style={{color: 'black'}}>
        </Text>
      </View>
    );
  }
}

module.exports = Lib;
