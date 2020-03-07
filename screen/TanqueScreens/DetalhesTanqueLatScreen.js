import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import TanqueModal from '../../components/modals/TanqueModal';
import GetLocation from 'react-native-get-location';
import GoogleStaticMap from 'react-native-google-static-map';
import * as Config from '../../app.json';

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
      distancia: '',
    };
  }

  distancia = (lati, long) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then( location => {
      var dist = Math.sqrt(
        Math.pow(lati-location.latitude, 2)+
        Math.pow(long-location.longitude, 2)
        )*111.045;
      dist -= dist%0.001;
      dist = dist<1 ? dist=(dist*1000)+'m' : dist+"km";
      this.setState({'distancia': dist});
    })
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

    const apiCall = await fetch(Config.baseUrl+'/api/retirada',
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

    const apiCall = await fetch(Config.baseUrl+'/api/retirada',
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

  confirm(total) {
    Alert.alert(
      'Retirada Total',
      'Tem certeza que deseja solicita a tirada total de '+total+' litros do tanque?',
      [
        {text: 'Confirmar', onPress: () => this.onTotal()},
        {text: 'Cancelar', onPress: () => alert('operação cancelada!'), style: "{color:'red'}" },
      ]
    );
  }


  render() {
    var t = this.props.navigation.getParam('tanque').tipo
    var a = this.props.navigation.getParam('tanque').qtdAtual
    var r = this.props.navigation.getParam('tanque').qtdRestante
    var c = a+r
    var p = a*100/c
    p = p-(p%0.01)
    var x, y;
    var lati = this.props.navigation.getParam('tanque').latitude;
    var long = this.props.navigation.getParam('tanque').longitude;
    lati<0 ? x = (lati*-1)+"ºS" : x = lati+"ºN";
    long<0 ? y = (long*-1)+"ºW" : y = long+"ºE";
    var dist = this.state.distancia == '' ? this.distancia(lati,long) : this.state.distancia;
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
                  <Text style={styles.negrito}>Endereço: </Text>{this.props.navigation.getParam('tanque').localizacao}{'\n'}
                  <Text style={styles.negrito}>Responsável: </Text>{this.props.navigation.getParam('tanque').responsavel.nome}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  <Text style={styles.negrito}>Tipo: </Text>{t}{'\n'}
                  <Text style={styles.negrito}>Capacidade: </Text>{c} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Atual: </Text>{a} Litros{'\n'}
                  <Text style={styles.negrito}>Qtd. Livre: </Text>{r} Litros{'\n'}
                  <Text style={styles.negrito}>Preenchido: </Text>{p}%{'\n'}
                  <Text style={styles.negrito}>Distancia estimada: </Text>{this.state.distancia}
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
            <CardItem bordered>
              <Body>
                <Text style={styles.negrito}>Localização {'\n'}</Text>
                <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.google.com/maps/place/'+x+'+'+y)}}>
                  <GoogleStaticMap
                    style={styles.map} 
                    latitude={lati}
                    longitude={long}
                    zoom={15}
                    size={{ align: 'center', width: 300, height: 200 }}
                    apiKey={Config.apiKey}
                  /> 
                </TouchableOpacity>
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
            <Fab
              active={this.state.active}
              direction="left"
              containerStyle={{}}
              style={{ backgroundColor: 'black' }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active})}>
              <Icon name="add" />
              <Button style={{backgroundColor: 'black'}} onPress={() => this.setState({modalVisible: true, active: false})}>
                <Icon>P</Icon>
              </Button>
              <Button style={{backgroundColor: 'black'}} onPress={() => this.confirm(this.props.navigation.getParam('tanque').qtdAtual)}>
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

  },

  cancel: {
    color: '#F00'
  }

});