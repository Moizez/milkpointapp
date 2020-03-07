import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import { Container, Content, Accordion, Card, CardItem, Body, Text, View, Button, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location';
import GoogleStaticMap from 'react-native-google-static-map';
import * as Config from '../../app.json';
import { geoInterpolate } from 'd3';

export default class DetalhesTanqueRespScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      active: false,
      modalVisible: false,
      distancia: '',
      latitude: '',
      longitude: ''
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

  getlocation(){
    let location = {};
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then( location => {
      //alert(JSON.stringify(location));
      this.onConfirm(location);
    })
    .catch(error => {
        const { code, message } = error;
        alert(error+':'+message);
    });
  }

  onConfirm = async (location) => {
    var idTanque = this.props.navigation.getParam('tanque').id;
    //var idResp = this.props.navigation.getParam('tanque').responsavel.id;
    const data = new FormData();
    data.append("latitude", location.latitude);
    data.append("longitude", location.longitude);
    fetch(Config.baseUrl+'/api/tanque/location/'+idTanque+'/'+location.latitude+"/"+location.longitude,
    {
      method: 'PUT',  
      //body: data
    })
    .then(apiCall => {
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      this.distancia(location.latitude, location.longitude);
      JSON.stringify(apiCall.status) == 200 ?
      alert('Localização atualizada com sucesso!'):
      alert(JSON.stringify(apiCall.status) );
      
      this.render();
    })
  }

  confirm() {
    Alert.alert(
      'Atualizar localização',
      'Tem certeza que deseja atualizar a localiação do tanque com base na sua posição atual?',
      [
        {text: 'Confirmar', onPress: () => this.getlocation()},
        {text: 'Cancelar', onPress: () => alert('operação cancelada!'), style: 'cancel'},
      ]
    );
    this.render();
  }


  render() {
    
    var t = this.props.navigation.getParam('tanque').tipo
    var a = this.props.navigation.getParam('tanque').qtdAtual
    var r = this.props.navigation.getParam('tanque').qtdRestante
    var c = a+r
    var p = a*100/c
    p = p-(p%0.01)
    var x, y;
    var lati = (this.state.latitude == '' ? this.props.navigation.getParam('tanque').latitude : this.state.latitude)
    var long = (this.state.longitude == '' ? this.props.navigation.getParam('tanque').longitude : this.state.longitude)
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
                  <Text style={styles.negrito}>Qtd. Livre: </Text>{r} Litros{'\n'}
                  <Text style={styles.negrito}>Preenchido: </Text>{p}%{'\n'}
                  <Text style={styles.negrito}>Descrição: </Text>{this.props.navigation.getParam('tanque').descricao}
                </Text>
              </Body>
            </CardItem>
            <CardItem bordered 
              style={lati*long == 0 ? {display: 'none'} : {}}
            >
              <Body>
              <Text style={styles.negrito}>Distancia estimada: <Text>{this.state.distancia == '' ? this.distancia(lati,long) : this.state.distancia}</Text></Text>
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
            <TouchableOpacity style={{backgroundColor: 'black'}} onPress={() => this.props.navigation.navigate('DepositosPendentes')}>
                <Icon>D</Icon>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'black'}}  onPress={() => this.props.navigation.navigate('RetiradasPendentes')}>
                <Icon>R</Icon>
            </TouchableOpacity>
            <TouchableOpacity 
              style={lati*long == 0 ? {backgroundColor: 'black'} : {display: 'none', backgroundColor: 'black'}}
              onPress={() => this.confirm()}>
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