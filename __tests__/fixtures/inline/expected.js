'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

class Inline extends Component {
  render() {
    return <View style={[styles.body, styles.container]}>
        <Text style={[styles.strong, styles.header, styles.intent]}>
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text style={[styles.instructions, { color: red }]}>
        </Text>
        <Text>
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text style={[styles.header, styles.intent, styles.strong]}>
        </Text>
      </View>;
  }
}

const styles = StyleSheet.create({
  body: {},
  container: {},
  instructions: {},
  strong: {},
  intent: {}
});

module.exports = Inline;
