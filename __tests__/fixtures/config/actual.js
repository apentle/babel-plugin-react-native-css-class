'use strict';

import React, { Component, Text, View } from 'react-native';
import theme from 'react-native-theme';

class Config extends Component {
  render() {
    return (
      <View style={theme.styles.container} class="body">
        <Text style={[theme.styles.header, theme.styles.intent]} class="strong">
        </Text>
        <Text style={theme.styles.instructions}>
        </Text>
        <Text class="instructions">
        </Text>
        <Text class="instructions" style={{color: red}}>
        </Text>
      </View>
    );
  }
}

module.exports = Config;
