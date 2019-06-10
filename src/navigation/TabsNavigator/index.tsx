import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const WINDOW = Dimensions.get('window');

export interface TabsNavigatorSceneProps {
  isFocused: boolean;
}

export interface TabsNavigatorProps {
  tabs: TabProps[];
}

export interface TabsNavigatorState {
  currentTab: TabProps;
}

export interface TabProps {
  title: string;
  scene: React.ComponentClass<any>;
}

class TabsNavigatorComponent extends React.Component<
  TabsNavigatorProps,
  TabsNavigatorState
> {
  constructor(props: TabsNavigatorProps) {
    super(props);
    this.state = {
      currentTab: props.tabs[0],
    };
  }

  handleTabPress = (tabProps: TabProps, i: number) => {
    this.setState({ currentTab: tabProps });
  };

  renderScene = (tabProps: TabProps, i: number) => {
    const isFocused = tabProps === this.state.currentTab;
    const Scene = tabProps.scene;
    const sceneContainerStyle = [
      StyleSheet.absoluteFill,
      tabsNavigatorStyles.sceneContainer,
      isFocused &&
        tabsNavigatorStyles.sceneActiveContainer,
    ];
    const sceneProps: TabsNavigatorSceneProps = {isFocused}
    return (
      <View key={`${Scene.displayName}_${i}`} style={sceneContainerStyle}>
        <SafeAreaView style={tabsNavigatorStyles.container}>
          <Scene {...sceneProps} />
        </SafeAreaView>
      </View>
    );
  };

  renderTab = (tabProps: TabProps, i: number) => {
    const tabContainerStyle = [
      tabsNavigatorStyles.tabItemContainer,
      tabProps === this.state.currentTab &&
        tabsNavigatorStyles.tabItemActiveContainer,
    ];
    return (
      <TouchableOpacity
        key={`${tabProps.scene.displayName}_${i}`}
        onPress={() => this.handleTabPress(tabProps, i)}
        style={tabContainerStyle}
      >
        <Text>{tabProps.title}</Text>
      </TouchableOpacity>
    );
  };

  public render() {
    return (
      <>
        <View style={tabsNavigatorStyles.container}>
          {this.props.tabs.map(this.renderScene)}
        </View>
        <SafeAreaView style={tabsNavigatorStyles.tabsContainer}>
          {this.props.tabs.map(this.renderTab)}
        </SafeAreaView>
      </>
    );
  }
}

export const TabsNavigator = TabsNavigatorComponent;

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
