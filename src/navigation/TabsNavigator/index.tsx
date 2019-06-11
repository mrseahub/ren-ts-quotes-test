import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { tabsNavigatorStyles } from './styles';
import {
  TabProps,
  TabsNavigatorProps,
  TabsNavigatorSceneProps,
  TabsNavigatorState,
} from './types';

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
      isFocused && tabsNavigatorStyles.sceneActiveContainer,
    ];
    const sceneProps: TabsNavigatorSceneProps = { isFocused };
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
