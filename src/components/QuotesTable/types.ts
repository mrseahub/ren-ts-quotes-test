export type FlatListItem = {
    item: QuoteTableItemProps;
    index: number;
  };
  
  export interface QuoteTableItemProps {
    name: string;
    last: string;
    highestBid: string;
    percentChange: string;
  }
  
  export interface QuoteTableProps {
    url: string;
    updated: boolean;
    updateInterval: number;
    header: string[];
  }
  
  export interface QuoteTableState {
    data: QuoteTableItemProps[];
    isLoading: boolean;
    lastUpdate: any | null;
  }