import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import TanqueScreen from '../TanqueScreens/TanqueScreen';
import * as Config from '../../app.json'

export default class HomeLatScreen extends React.Component {

  state = {
    tanques: []
  };

  async componentDidMount() {
    const apiCall = await fetch(Config.baseUrl+'/api/tanque');
    const response = await apiCall.json();

    this.setState({
      tanques: response,
    });

    var papel = await AsyncStorage.getItem("@MilkPoint:papel");

    await AsyncStorage.setItem('@MilkPoint:tanques', JSON.stringify(tanques));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Text style={styles.headerText}>Milk Point{'\n'}
            <Text style={{ fontSize: 18 }}>Módulo Laticínio</Text>
          </Text>
          <View>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
          </View>
        </Header>
        <View style={{ borderBottomColor: '#A4A4A4', borderBottomWidth: 1 }} />

        <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          {this.state.tanques.map(tanque =>
            <TouchableOpacity key={tanque.id}
              onPress={() => this.props.navigation.navigate('DetalhesTanqueLat', { tanque: tanque })}>
              <TanqueScreen nome={tanque.nome} qtdRestante={tanque.qtdRestante}
                localizacao={tanque.localizacao} responsavel={tanque.responsavel.nome} 
                qtdAtual={tanque.qtdAtual} capacidade={tanque.qtdAtual+tanque.qtdRestante}/>
            </TouchableOpacity>)}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    marginBottom: 20,
  },

  header: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    height: 100,
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  headerText: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  logo: {
    marginHorizontal: 8,
    marginVertical: 8,
    width: 60,
    height: 60,
  },

  listaEstudantes: {
    paddingTop: 10,
  },

  circleProgress: {
    alignItems: 'center',
    marginTop: 150,
  },

  scrollView: {
    paddingTop: 20,
  },

});
