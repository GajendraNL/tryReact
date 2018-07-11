import React from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SaveDetails from './SaveDetails';

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};

function StackNavigatorAction() {
	const navigator = StackNavigator(...arguments);
	navigator.router.getStateForAction = navigateOnce(navigator.router.getStateForAction);
	return navigator;
}

const HomeStackNav = StackNavigatorAction({
  Home: { screen: HomeScreen },
  SaveDetails: { screen: SaveDetails },
  }, {
  // Explicitly set the default screen to use
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

class HomeStack extends React.Component {
  render() {
    return <HomeStackNav />;
  }
}

export { HomeStack };
