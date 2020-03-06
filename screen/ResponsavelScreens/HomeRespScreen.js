import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProgressCircle from 'react-native-progress-circle';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class HomeRespScreen extends React.Component {

  state = {
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
    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/tanque');
    const response = await apiCall.json();
    
    this.setState({
      responsavel: {
        id: await AsyncStorage.getItem("@MilkPoint:id"),
        nome: await AsyncStorage.getItem("@MilkPoint:nome"),
        email: await AsyncStorage.getItem("@MilkPoint:email"),
        cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
      },
      tanques: response,
    });

    this.state.tanques.forEach((tank, i) => {
      
      if(tank.responsavel.id == this.state.responsavel.id) {
        var a = tank.qtdAtual
        var c = tank.qtdAtual+tank.qtdRestante
        var p = (tank.qtdAtual*100/c)
        p = p - (p%0.01)
        var t = tank.tipo
        this.setState({
          tanque: tank, 
          porcentagem: p, 
          qtdAtual: a, 
          capacidade: c,
          tipo: t
        })
      }
    });
  };

  render() {
    return (
      <Container style={styles.container}>
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
        <View style={styles.circleProgress}>
          <Text style={styles.title}>Tanque {this.state.tanque.nome}</Text>
          <TouchableOpacity onPress={() => 
            this.props.navigation.navigate('DetalhesTanqueResp', {tanque: this.state.tanque})}>
            <ProgressCircle
              percent={this.state.porcentagem}
              radius={100}
              borderWidth={30}

              color={this.state.tipo == 'BOVINO'? "#3399FF":"#33FF99"}
              shadowColor="#999"
              bgColor='#E6E6E6'
            >
              <Text style={{ fontSize: 14 }}>Tipo: {this.state.tipo}</Text>
              <Text style={{ fontSize: 14 }}>Quantidade: {this.state.qtdAtual}</Text>
              <Text style={{ fontSize: 14 }}>Capacidade: {this.state.capacidade}</Text>
              <Text style={{ fontSize: 14 }}>{this.state.porcentagem}% preenchido</Text>
            </ProgressCircle>
          </TouchableOpacity>
        </View>
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