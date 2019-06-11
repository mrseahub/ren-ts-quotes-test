import * as React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../common/strings';
import { infoStyles } from './styles';

class InfoComponent extends React.Component {
  public render() {
    return (
      <View style={infoStyles.container}>
         <Text>{strings.infoComponent}</Text>
      </View>
    );
  }
}

export const Info = InfoComponent;
