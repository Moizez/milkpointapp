import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
//import GetLocation from 'react-native-get-location'

export default class DetalhesTanqueRespScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
      responsavel: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
      },
    };
  }

  /* getlocation(){
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        alert(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code + ' - ' + message);
    })
  } */

  render() {
    
    var t = this.props.navigation.getParam('tanque').tipo
    var a = this.props.navigation.getParam('tanque').qtdAtual
    var r = this.props.navigation.getParam('tanque').qtdRestante
    var c = a+r
    var p = a*100/c
    p = p-(p%0.01)
    return (
      <Container style={styles.container}>
        <View padder>
          <Card>
            <CardItem header bordered>
              <Text style={{ color: 'red', paddingLeft: 100 }}>
                <Text style={styles.negrito}>Tanque: </Text>{this.props.navigation.getParam('tanque').nome}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  <Text style={styles.negrito}>Tipo: </Text>{t}{'\n'}
                  <Text style={styles.negrito}>Capacidade: </Text>{c} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Atual: </Text>{a} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Restante: </Text>{r} Litros{'\n'}
                  <Text style={styles.negrito}>Preenchido: </Text>{p}%                  
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  <Text style={styles.negrito}>Descrição: </Text>{this.props.navigation.getParam('tanque').descricao}
                </Text>
              </Body>
            </CardItem>
          </Card>
          
        </View>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: 'black' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active})}>
            <Icon name="add" />
            <TouchableOpacity style={{backgroundColor: 'black'}} onPress={() => this.props.navigation.navigate('DepositosPendentes')}>
                <Icon>D</Icon>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'black'}} onPress={() => this.props.navigation.navigate('RetiradasPendentes')}>
                <Icon>R</Icon>
            </TouchableOpacity>
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },

  negrito: {
    fontWeight: 'bold',
  },

  cardTanque: {

  }

});