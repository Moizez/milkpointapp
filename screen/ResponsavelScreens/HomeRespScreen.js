import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressCircle from 'react-native-progress-circle';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Config from '../../app.json';
import { treemapSlice } from 'd3';


export default class HomeRespScreen extends React.Component {
  state = {
    spinner: false,
    responsavel: {
      id: '',
      nome: '',
      email: '',
      cpf: '',
    },
    tanque: '',
    tanques: [],
    porcentagem: 0,
    qtdAtual: '',
    capacidade: '',
    tipo: ''
  };

  async componentDidMount() {    
    this.setState({spinner: true});
    const apiCall = await fetch(Config.baseUrl+'/api/tanque');
    const response = await apiCall.json();
    
    this.setState({
      tanques: response,
      responsavel: {
        id: await AsyncStorage.getItem("@MilkPoint:id"),
        nome: await AsyncStorage.getItem("@MilkPoint:nome"),
        email: await AsyncStorage.getItem("@MilkPoint:email"),
        cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
      },
    });
    
    
    await AsyncStorage.setItem('@MilkPoint:tanques', JSON.stringify(response));
    this.setState({spinner: false});
    
  }

  render() {
    
    return (
      <Container style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Aguarde...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={styles.header}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Text style={styles.headerText}>MilkPoint{'\n'}
            <Text style={{ fontSize: 18 }}>Módulo Tanque</Text>
          </Text>
          <View>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
          </View>
        </Header>
        <View style={{ borderBottomColor: '#A4A4A4', borderBottomWidth: 1 }} />
        <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          {this.state.tanques.map(tanque => 
            
            <View style={styles.circleProgress}>
              <Text style={styles.title}>Tanque {tanque.nome}</Text>
              <TouchableOpacity onPress={() => 
                this.props.navigation.navigate('DetalhesTanqueResp', {tanque: tanque})}>
                <ProgressCircle
                  percent={
                    tanque.qtdAtual/(tanque.qtdAtual+tanque.qtdRestante)*100
                  }
                  radius={100}
                  borderWidth={30}
                  color={this.state.tipo == 'BOVINO'? "#3399FF":"#33FF99"}
                  shadowColor="#999"
                  bgColor='#E6E6E6'
                >
                  <Text style={{ fontSize: 14 }}>Tipo: {tanque.tipo}</Text>
                  <Text style={{ fontSize: 14 }}>Quantidade: {tanque.qtdAtual}</Text>
                  <Text style={{ fontSize: 14 }}>Capacidade: {tanque.qtdAtual+tanque.qtdRestante}</Text>
                  <Text style={{ fontSize: 14 }}> {Math.round(tanque.qtdAtual/(tanque.qtdAtual+tanque.qtdRestante)*100)}% preenchido</Text>
                  
                </ProgressCircle>
              </TouchableOpacity>
            </View>
            //}
          )}
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
    marginTop: 100,
  },

  scrollView: {
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold',
  }
});