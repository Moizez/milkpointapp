import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import TanqueModal from '../../components/modals/TanqueModal';

export default class DetalhesTanqueLatScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
      laticinio: {
        id: '',
        nome: '',
        email: '',
        cnpj: '',
      },
      papel: '',
      retiradas: [],
    };
  }

  openModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  async componentDidMount() {
    this.setState({
      laticinio: {
      id: await AsyncStorage.getItem("@MilkPoint:id"),
      nome: await AsyncStorage.getItem("@MilkPoint:nome"),
      email: await AsyncStorage.getItem("@MilkPoint:email"),
      cnpj: await AsyncStorage.getItem("@MilkPoint:cnpj"),
      },
      papel: await AsyncStorage.getItem("@MilkPoint:papel")
    })  
  }

  onAdd = async (quantidadeTitle) => {

    const data = new FormData();
    data.append("quantidade", quantidadeTitle);
    data.append("idLat", this.state.laticinio.id);
    data.append("idTanque", this.props.navigation.getParam('tanque').id);

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada',
    {
      method: 'POST',
      body: data
    })

    const response = apiCall.json();
    
    this.setState({
      retiradas: response,
      modalVisible: false
    });

    alert("Pedido Realizado Com Sucesso!" + "\n" + "Aguarde Confirmação!")

    await AsyncStorage.setItem('@MilkPoint:retiradas', JSON.stringify(this.state.retiradas));
  };

  onTotal = async () => {

    this.setState({active: false})
    
    const data = new FormData();
    data.append("quantidade", this.props.navigation.getParam('tanque').qtdAtual);
    data.append("idLat", this.state.laticinio.id);
    data.append("idTanque", this.props.navigation.getParam('tanque').id);

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada',
    {
      method: 'POST',
      body: data
    })

    const response = apiCall.json();
    
    this.setState({
      retiradas: response,
      modalVisible: false
    });

    alert("Pedido Realizado Com Sucesso!" + "\n" + "Aguarde Confirmação!")

    await AsyncStorage.setItem('@MilkPoint:retiradas', JSON.stringify(this.state.retiradas));
  };

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
                  <Text style={styles.negrito}>Localização: </Text>{this.props.navigation.getParam('tanque').localizacao}{'\n'}
                  <Text style={styles.negrito}>Responsável: </Text>{this.props.navigation.getParam('tanque').responsavel.nome}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                <Text style={styles.negrito}>Capacidade: </Text>{this.props.navigation.getParam('tanque').qtdAtual+this.props.navigation.getParam('tanque').qtdRestante} Litros{'\n'}
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
              <Button style={{backgroundColor: 'black'}} onPress={() => this.setState({modalVisible: true, active: false})}>
                <Icon>P</Icon>
              </Button>
              <Button style={{backgroundColor: 'black'}} onPress={() => this.onTotal()}>
                <Icon>T</Icon>
              </Button>
            </Fab>
          </View>

          <TanqueModal 
            visible={this.state.modalVisible}
            onCancel={this.closeModal} 
            onAdd={this.onAdd}
          />
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