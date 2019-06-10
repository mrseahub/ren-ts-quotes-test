import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export interface TabsNavigatorProps {
  tabs: TabProps[];
}

export interface TabsNavigatorState {
  currentTab:TabProps
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
      currentTab: props.tabs[0]
    };
  }


  handleTabPress = (tabProps: TabProps, i: number) => {
    this.setState({currentTab: tabProps})
  }

  renderTab = (tabProps: TabProps, i: number) => {
    const tabContainerStyle = [
      tabsNavigatorStyles.tabItemContainer,
      tabProps === this.state.currentTab && tabsNavigatorStyles.tabItemActiveContainer
    ]
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
    const CurrentTab = this.state.currentTab.scene;
    return (
      <>
        <SafeAreaView style={tabsNavigatorStyles.sceneContainer}>
          <CurrentTab {...this.props}/>
        </SafeAreaView>
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
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 70,
  },
  tabItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemActiveContainer: {
    backgroundColor:'lightgray'
  },
});
