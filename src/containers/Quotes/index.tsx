import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { QuoteTable } from '../../components/QuotesTable';

export interface QuotesProps {}

export interface QuotesState {}

class QuotesComponent extends React.Component<QuotesProps, QuotesState> {
  constructor(props: QuotesProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return <QuoteTable url={'https://poloniex.com/public?command=returnTicker'} />;
  }
}

export const Quotes = QuotesComponent;
