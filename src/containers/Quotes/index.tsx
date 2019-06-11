import * as React from 'react';
import { View, StyleSheet, Text, AppState } from 'react-native';
import { QuoteTable } from '../../components/QuotesTable';
import { TabsNavigatorSceneProps } from '../../navigation/TabsNavigator/index';

const header = ['Name', 'Last', 'Highest Bid', 'Percent Change'];
const url = 'https://poloniex.com/public?command=returnTicker';
const updateInterval = 5000;

export interface QuotesProps extends TabsNavigatorSceneProps {}

export interface QuotesState {
  isActiveApp: boolean;
}

class QuotesComponent extends React.Component<QuotesProps, QuotesState> {
  constructor(props: QuotesProps) {
    super(props);
    this.state = {
      isActiveApp: true,
    };
  }

  handleAppStateChange = (nextAppState: string) => {
    this.setState({ isActiveApp: nextAppState === 'active' });
  };

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  public render() {
    return (
      <QuoteTable
        updated={this.props.isFocused && this.state.isActiveApp}
        url={url}
        updateInterval={updateInterval}
        header={header}
      />
    );
  }
}

export const Quotes = QuotesComponent;
