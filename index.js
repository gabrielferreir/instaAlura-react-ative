import {AppRegistry} from 'react-native';
import App from './src/App'
import Login from './src/auth/login';
import {name as appName} from './app.json';
import Teste from "./src/teste";

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent(appName, () => App);


