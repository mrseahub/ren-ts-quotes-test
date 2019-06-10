import * as React from 'react';
import { Info } from './src/containers/Info';
import { Quotes } from './src/containers/Quotes';
import { TabsNavigator } from './src/navigation/TabsNavigator';

console.disableYellowBox = true;

const tabs = [
  { scene: Quotes, title: 'Quotes' },
  { scene: Info, title: 'Info' },
];

export default class AppComponent extends React.Component {
  public render() {
    return <TabsNavigator tabs={tabs} />;
  }
}
