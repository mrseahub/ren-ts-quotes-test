import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface InfoProps {
}

export interface InfoState {
}

class InfoComponent extends React.Component<InfoProps, InfoState> {
  constructor(props: InfoProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={infoStyles.container}>
         <Text>Info Component</Text>
      </View>
    );
  }
}

export const Info = InfoComponent;

export const infoStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
