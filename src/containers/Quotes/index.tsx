import * as React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { QuoteTable } from '../../components/QuotesTable';
import { header, updateInterval, url } from './config';
import { QuotesProps, QuotesState } from './types';

class QuotesComponent extends React.Component<QuotesProps, QuotesState> {
  constructor(props: QuotesProps) {
    super(props);
    this.state = {
      isActiveApp: true,
    };
  }

  handleAppStateChange = (nextAppState: AppStateStatus) => {
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
