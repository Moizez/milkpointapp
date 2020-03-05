import React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import TanqueModal from '../../components/modals/TanqueModal';
import GoogleStaticMap from 'react-native-google-static-map';

export default class DetalhesTanqueScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
      produtor: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
      },
      depositos: [],
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
      produtor: {
      id: await AsyncStorage.getItem("@MilkPoint:id"),
      nome: await AsyncStorage.getItem("@MilkPoint:nome"),
      email: await AsyncStorage.getItem("@MilkPoint:email"),
      cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
      },
    })  
  }

  onAdd = async (quantidadeTitle) => {

    const data = new FormData();
    data.append("quantidade", quantidadeTitle);
    data.append("idProd", this.state.produtor.id);
    data.append("idTanque", this.props.navigation.getParam('tanque').id);

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/deposito',
    {
      method: 'POST',
      body: data
    })

    const response = apiCall.json();
    
    this.setState({
      depositos: response,
      modalVisible: false
    });

    alert("Pedido Realizado Com Sucesso!" + "\n" + "Aguarde Confirmação!")

    await AsyncStorage.setItem('@MilkPoint:depositos', JSON.stringify(this.state.depositos));
  };

  render() {
    var x, y;
    var lati = this.props.navigation.getParam('tanque').latitude;
    var long = this.props.navigation.getParam('tanque').longitude;
    lati<0 ? x = (lati*-1)+"ºS" : x = lati+"ºN";
    long<0 ? y = (long*-1)+"ºW" : y = long+"ºE";
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
                  <Text style={styles.negrito}>Descrição: </Text>{this.props.navigation.getParam('tanque').qtdAtual+this.props.navigation.getParam('tanque').descricao}
                </Text> 
              </Body>
            </CardItem>
            <CardItem bordered>
              <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.google.com/maps/place/'+x+'+'+y)}}>
                <GoogleStaticMap
                  style={styles.map} 
                  latitude={lati}
                  longitude={long}
                  zoom={15}
                  size={{ align: 'center', width: 300, height: 200 }}
                  apiKey={'AIzaSyAt-XzTfI1v5NlSNnJensHSf9bWt-ittc8'}
                />
              </TouchableOpacity>
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
              onPress={() => this.setState({ active: !this.state.active, modalVisible: !this.state.modalVisible})}>
              <Icon name="add" />
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