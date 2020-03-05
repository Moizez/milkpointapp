import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import GoogleStaticMap from 'react-native-google-static-map';
export default class DetalhesTanqueRespScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
    };
  }

  getlocation(){
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      //this.setState({latitude:location.latitude, longitude: location.longitude});
      this.onConfirm(location);
      this.render();  
    })
    .catch(error => {
        const { code, message } = error;
        alert(error+':'+message);
    })
  }

  onCllose = () => {
    this.setState({ modalVisible: false });
  };
  onConfirm = async (location) => {
    var idTanque = this.props.navigation.getParam('tanque').id;
    //var idResp = this.props.navigation.getParam('tanque').responsavel.id;
    const data = new FormData();
    
    data.append("latitude", location.latitude);
    data.append("longitude", location.longitude);
    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/tanque/location/'+idTanque+'/'+location.latitude+"/"+location.longitude,
    {
      method: 'PUT',  
      //body: data
    })
    
    const response = apiCall.json();
    
    this.setState({
      latitude: response.latitude,
      longitude: response.longitude,
      modalVisible: false
    });
    JSON.stringify(apiCall.status) == 200 ?
    alert('Localização atualizada com sucesso!'):
    Alert(JSON.stringify(apiCall.status));
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
            direction="left"
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
            <TouchableOpacity style={{backgroundColor: 'black'}} onPress={() => this.getlocation()}>
                <Icon>L</Icon>
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

  },

  map: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1
  }

});