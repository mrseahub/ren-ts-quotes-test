import { StyleSheet } from 'react-native';
import { WINDOW } from '../constants';
  
export const tabsNavigatorStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sceneContainer: {
      opacity: 0,
      transform: [{ translateX: WINDOW.width }],
    },
    sceneActiveContainer: {
      opacity: 1,
      transform: [{ translateX: 0 }],
    },
    tabsContainer: {
      flexDirection: 'row',
      height: 60,
    },
    tabItemContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabItemActiveContainer: {
      backgroundColor: 'lightgray',
    },
  });