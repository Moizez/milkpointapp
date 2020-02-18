import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

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

  render() {
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
                  <Text style={styles.negrito}>Capacidade: </Text>{this.props.navigation.getParam('tanque').capacidade} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Atual: </Text>{this.props.navigation.getParam('tanque').qtdAtual} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Restante: </Text>{this.props.navigation.getParam('tanque').qtdRestante} Litros
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