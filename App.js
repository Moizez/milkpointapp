import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator, createDrawerNavigator, DrawerItem, createSwitchNavigator } from 'react-navigation';
import HomeRespScreen from './screen/ResponsavelScreens/HomeRespScreen';
import HomeProdScreeen from './screen/ProdutorScreens/HomeProdScreen';
import HomeLatScreen from './screen/LaticinioScreens/HomeLatScreen';
import ConfigurationRespScreen from './screen/ResponsavelScreens/ConfigurationRespScreen';
import NotificationRespScreen from './screen/ResponsavelScreens/NotificationRespScreen';
import RelatorioRespScreen from './screen/ResponsavelScreens/RelatorioRespScreen';
import ConfigurationProdScreen from './screen/ProdutorScreens/ConfigurationProdScreen';
import NotificationProdScreen from './screen/ProdutorScreens/NotificationProdScreen';
import RelatorioProdScreen from './screen/ProdutorScreens/RelatorioProdScreen';
import ConfigurationLatScreen from './screen/LaticinioScreens/ConfigurationLatScreen';
import NotificationLatScreen from './screen/LaticinioScreens/NotificationLatScreen';
import RelatorioLatScreen from './screen/LaticinioScreens/RelatorioLatScreen';
import LoginScreen from './screen/LoginScreen';
import LogoutScreen from './screen/LogoutScreen';
import LoadingLoginScreen from './screen/LoadingLoginScreen';
import CapacityTankScreen from './screen/ResponsavelScreens/CapacityTankScreen';
import DetalhesTanqueScreen from './screen/TanqueScreens/DetalhesTanqueScreen';
import DetalhesTanqueLatScreen from './screen/TanqueScreens/DetalhesTanqueLatScreen';
import DetalhesTanqueResp from './screen/TanqueScreens/DetalhesTanqueRespScreen';
import DepositosPendentes from './screen/DepositoScreens/DepositosPendentesScreen';
import RetiradasPendentes from './screen/RetiradaScreens/RetiradasPendentesScreen';

export default class App extends React.Component {

  render() {
    return (
      <SwitchNavigator />
    );
  };
};
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
    <View style={{height: 150}}>
      <Image source={require('./assets/images/logo.png')} style={{height: 120, width: 120, borderRadius: 60}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>

)

const DrawerNavigatorResp = createDrawerNavigator(
  {
    Home: HomeRespScreen,
    Relatorio: RelatorioRespScreen,
    Notificacoes: NotificationRespScreen,
    Configuracao: ConfigurationRespScreen,
    Logout: LogoutScreen,
  }, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    }
  },{
    contentComponent: CustomDrawerComponent,
  }
)

const StackResponsavel = createStackNavigator(
  {
    DrawerNavigator: DrawerNavigatorResp,
    DetalhesTanqueResp: DetalhesTanqueResp,
    DepositosPendentes: DepositosPendentes,
    RetiradasPendentes: RetiradasPendentes,
  }, {
    initialRouteName: 'DrawerNavigator',
    navigationOptions: {
      headerTransparent: true,
    },
  }
)

const DrawerNavigatorProd = createDrawerNavigator(
  {
    Home: HomeProdScreeen,
    Relatorio: RelatorioProdScreen,
    Notificacoes: NotificationProdScreen,
    Configuracao: ConfigurationProdScreen,
    Logout: LogoutScreen,
  }, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    }
  },{
    contentComponent: CustomDrawerComponent,
  }
)

const StackProdutor = createStackNavigator(
  {
    DrawerNavigator: DrawerNavigatorProd,
    DetalhesTanque: DetalhesTanqueScreen,
  }, {
    initialRouteName: 'DrawerNavigator',
    navigationOptions: {
      headerTransparent: true,
    },
  }
)

const DrawerNavigatorLat = createDrawerNavigator(
  {
    Home: HomeLatScreen,
    Relatorio: RelatorioLatScreen,
    Notificacoes: NotificationLatScreen,
    Configuracao: ConfigurationLatScreen,
    Logout: LogoutScreen,
  }, {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTransparent: true,
    }
  },{
    contentComponent: CustomDrawerComponent,
  }
)

const StackLaticinio = createStackNavigator(
  {
    DrawerNavigator: DrawerNavigatorLat,
    DetalhesTanqueLat: DetalhesTanqueLatScreen,
  }, {
    initialRouteName: 'DrawerNavigator',
    navigationOptions: {
      headerTransparent: true,
    },
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    StackResponsavel: StackResponsavel,
    StackProdutor: StackProdutor,
    StackLaticinio: StackLaticinio,
    LoadingLogin: LoadingLoginScreen,
    Logout: LogoutScreen,
    Login: LoginScreen,
  },{
    initialRouteName: 'LoadingLogin',
    navigationOptions: {
      headerTransparent: true,
    },
  }
);

