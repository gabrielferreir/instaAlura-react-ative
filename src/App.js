import React from "react";
import Login from "./auth/login";
import Home from "./home/Home";
import {createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
                headerLeft: null
            }
        }
    },
    {
        initialRouteName: 'Login',
    });

const prevGetStateForAction = RootStack.router.getStateForAction;
RootStack.router = {
    ...RootStack.router,
    getStateForAction(action, state) {
        if (state && action.type === 'ReplaceCurrentScreen') {
            const routes = state.routes.slice(0, state.routes.length - 1);
            console.warn('AQUI');
            routes.push(action);
            return {
                ...state,
                routes,
                index: routes.length - 1
            }
        }
        return prevGetStateForAction(action, state);
    }
}


export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
};
