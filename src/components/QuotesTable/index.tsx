import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

export type FlatListItem = {
  item: QuoteTableItemProps;
  index: number;
};

export interface QuoteTableItemProps {
  title: string;
  last: string;
  highestBid: string;
  percentChange: string;
}

export interface QuoteTableProps {
  url: string;
}

export interface QuoteTableState {
  data: QuoteTableItemProps[];
}

class QuoteTableComponent extends React.Component<
  QuoteTableProps,
  QuoteTableState
> {
  constructor(props: QuoteTableProps) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch(this.props.url)
      .then(r => r.json())
      .then(json => {
        const data = Object.keys(json).map(key => {
          return { title: key, ...json[key] };
        });
        this.setState({ data });
      });
  }

  keyExtractor = (item: QuoteTableItemProps, i: number) => `${i}`;

  renderItem = ({ item, index }: FlatListItem) => {
    return (
      <View style={quoteTableStyles.itemContainer}>
        <View style={quoteTableStyles.itemRowContainer}>
          <Text style={quoteTableStyles.itemColContainer}>{item.title}</Text>
          <Text style={quoteTableStyles.itemColContainer}>{item.last}</Text>
        </View>
        <View style={quoteTableStyles.itemRowContainer}>
          <Text style={quoteTableStyles.itemColContainer}>{item.highestBid}</Text>
          <Text style={quoteTableStyles.itemColContainer}>{item.percentChange}</Text>
        </View>
      </View>
    );
  };

  public render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export const QuoteTable = QuoteTableComponent;

export const quoteTableStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 80,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemColContainer: {
    flex: 1
  },
});
