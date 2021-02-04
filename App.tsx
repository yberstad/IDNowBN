import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import IDNow from './bridge/IDNow';

interface State {
  identId: string;
  response: string;
}
interface Props {}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      identId: '',
      response: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          de.idnow.android.sdk:idnow-platform:4.6.0
        </Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter IdentId"
          onChangeText={(text) => this.setState({identId: text})}
        />
        {/*<Button*/}
        {/*  title="Start identification"*/}
        {/*  onPress={async () => {*/}
        {/*    try {*/}
        {/*      const resp = await IDNow.start(this.state.identId, 'en');*/}
        {/*      this.setState({response: resp});*/}
        {/*    } catch (error) {*/}
        {/*      console.warn('==== e', await error);*/}
        {/*      const error2 = await error;*/}
        {/*      console.warn('==== e3', error2);*/}
        {/*      this.setState({response: error.message});*/}
        {/*    }*/}
        {/*  }}*/}
        {/*/>*/}

        <Button
          title="Start identification"
          onPress={() => {
            IDNow.start(this.state.identId, 'en')
              .then((resp) => {
                this.setState({response: resp});
              })
              .catch((error) => {
                this.setState({response: error.message});
              });
          }}
        />

        <Text style={styles.welcome}>{this.state.response}</Text>
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
  textInputStyle: {height: 40, borderColor: 'gray', borderWidth: 1},
});
