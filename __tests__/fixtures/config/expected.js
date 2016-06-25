'use strict';

import React, { Component, Text, View } from 'react-native';
import theme from 'react-native-theme';

class Config extends Component {
  render() {
    return <View style={[theme.styles.body, theme.styles.container]}>
        <Text style={[theme.styles.strong, theme.styles.header, theme.styles.intent]}>
        </Text>
        <Text style={theme.styles.instructions}>
        </Text>
        <Text style={theme.styles.instructions}>
        </Text>
        <Text style={[theme.styles.instructions, { color: 'red' }]}>
        </Text>
      </View>;
  }
}

module.exports = Config;
