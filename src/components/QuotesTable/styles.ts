import { StyleSheet } from 'react-native';

export const quoteTableStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 5,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemColContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'lightgray',
  },
  updatedData: {
    fontSize: 11,
    alignSelf: 'flex-end',
    padding: 5,
  },
});
