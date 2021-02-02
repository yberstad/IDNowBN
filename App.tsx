

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import IDNow from './bridge/IDNow';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>de.idnow.android.sdk:idnow-platform:4.6.0</Text>
        <Button
          title="Start identification"
          onPress={async () => {
            try {
              const resp = await IDNow.start('ZWK-ZSHML');
              console.warn('==== resp', resp);
            } catch (e) {
              console.warn('==== e', e);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
