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