'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

class Inline extends Component {
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
        <Text class=" ">
        </Text>
        <Text class={styles.instructions}>
        </Text>
        <Text class={[styles.header, styles.intent]} style={styles.strong}>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {},
  container: {},
  instructions: {},
  strong: {},
  intent: {},
});

module.exports = Inline;
