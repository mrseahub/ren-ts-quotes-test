import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { quoteTableStyles } from './styles';
import {
  FlatListItem,
  QuoteTableItemProps,
  QuoteTableProps,
  QuoteTableState,
} from './types';

class QuoteTableComponent extends React.Component<
  QuoteTableProps,
  QuoteTableState
> {
  updateTimer: any;

  constructor(props: QuoteTableProps) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      lastUpdate: null,
    };
  }

  handleRequestErorr = (err: any) => {
    __DEV__ && console.log(err);
    this.setState({ lastUpdate: 'Update failed' });
  };

  handleSuccess = (json: any) => {
    const data = Object.keys(json).map(name => {
      const { last, highestBid, percentChange } = json[name];
      return { name, last, highestBid, percentChange };
    });
    this.setState({
      data,
      isLoading: false,
      lastUpdate: new Date(Date.now()).toLocaleString(),
    });
  };

  handleUpdateQuotes = () => {
    if (!this.props.updated) return;
    fetch(this.props.url)
      .then(r => r.json())
      .then(this.handleSuccess)
      .catch(this.handleRequestErorr);
  };

  keyExtractor = (item: QuoteTableItemProps, i: number) => `${item.name}_${i}`;

  componentDidMount() {
    this.handleUpdateQuotes();
    this.updateTimer = setInterval(
      this.handleUpdateQuotes,
      this.props.updateInterval
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  renderRow = (text: string, i: number) => {
    return (
      <Text
        key={`${text.replace(/\s+/, '')}_${i}`}
        numberOfLines={1}
        style={quoteTableStyles.itemColContainer}
      >
        {text}
      </Text>
    );
  };

  renderItem = ({ item }: FlatListItem) => {
    return (
      <View style={quoteTableStyles.itemContainer}>
        {Object.keys(item).map((key, i) =>
          this.renderRow(item[key as keyof QuoteTableItemProps], i)
        )}
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={quoteTableStyles.headerContainer}>
        <View style={quoteTableStyles.itemContainer}>
          {this.props.header.map(this.renderRow)}
        </View>
        <Text style={quoteTableStyles.updatedData}>
          {`Last update: ${this.state.lastUpdate}`}
        </Text>
      </View>
    );
  };

  renderPreloader = () => {
    if (this.state.isLoading) {
      return <ActivityIndicator style={quoteTableStyles.itemContainer} />;
    }
    return null;
  };

  public render() {
    return (
      <>
        {this.renderHeader()}
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={this.renderPreloader()}
          initialNumToRender={10}
        />
      </>
    );
  }
}

export const QuoteTable = QuoteTableComponent;
