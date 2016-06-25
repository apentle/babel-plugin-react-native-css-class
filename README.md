# babel-plugin-react-native-css-class
[![Build Status](https://travis-ci.org/apentle/babel-plugin-react-native-css-class.svg?branch=master)](https://travis-ci.org/apentle/babel-plugin-react-native-css-class) [![npm version](https://badge.fury.io/js/babel-plugin-react-native-css-class.svg)](https://badge.fury.io/js/babel-plugin-react-native-css-class)

Use class tag in React Native Component

## Installation
```bash
npm i --save babel-plugin-react-native-css-class
```

## Usage
Create file `.babelrc` in your react native project folder
```javascript
{
  "presets": [ "react-native" ],
  "plugins": [ "react-native-css-class" ]
}
```

In RN component, you can use `class` tag
```javascript
'use strict';

import React, { Component, StyleSheet, Text, View } from 'react-native';

const HelloWorld = React.createClass({
  render() {
    return (
      <View class="container">
        <Text class="hello" style={{ color: '#F00' }}>
          Hello World!
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  hello: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});

module.exports = HelloWorld;
```

## Custom options
Update file `.babelrc`
```javascript
{
  "presets": [ "react-native" ],
  "plugins": [
    ["react-native-css-class", {
        "pragma": "varStyles"
    }]
  ]
}
```
Note: default `pragma` is `styles`
