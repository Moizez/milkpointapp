import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Config from '../app.json';

export default class LoginScreen extends Component {

  state = {
    spinner: false,
    email: '',
    senha: '',
    user: null,
    modalVisible: false,
    sms: false,
    telefone: '' 
  };

  login = async () => {
    if (this.state.email.trim().length == 0 || this.state.senha.trim().length == 0) {
      alert('Preencha o email e senha');
    } else {
      this.state.spinner = true;
      const data = {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.senha,
        }),
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': 'csrftoken'
        }
      }

      const apiCall = await fetch(Config.baseUrl+'/api/login', data);
      
      try {
        
        if (apiCall.status == 200) {
          
          this.setState({ user: await apiCall.json() });
          const user = this.state.user;
          await AsyncStorage.setItem('@MilkPoint:id', JSON.stringify(user.id));
          await AsyncStorage.setItem('@MilkPoint:nome', JSON.stringify(user.nome));
          await AsyncStorage.setItem('@MilkPoint:email', JSON.stringify(user.email));
          await AsyncStorage.setItem('@MilkPoint:perfil', JSON.stringify(user.perfil));
          
          perfil = await AsyncStorage.getItem("@MilkPoint:perfil");
          
          if(perfil == 1){
            await AsyncStorage.setItem('@MilkPoint:cpf', JSON.stringify(user.cpf));
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('StackProdutor');
          } else if(perfil == 2){
            await AsyncStorage.setItem('@MilkPoint:cpf', JSON.stringify(user.cpf));
            await AsyncStorage.setItem('@MilkPoint:telefone', JSON.stringify(user.telefone));
            await AsyncStorage.setItem('@MilkPoint:sendSms', JSON.stringify(user.sms));
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('StackResponsavel');
          } else if(perfil == 3){
            await AsyncStorage.setItem('@MilkPoint:cnpj', JSON.stringify(user.cnpj));
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('StackLaticinio');
          } else{
            alert("Erro ao efetuar Login")
          }
        }
        else {
          alert("Email e/ou Senha invalido(s)")
        }

      } catch (erro) {
        this.setState({ modalVisible: false });
        alert('Erro tentando fazer o login: ' + erro);
      }
      this.state.spinner = false;
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={'Fazendo Login \n Aguarde...'}
            textStyle={styles.spinnerTextStyle}
            />
        <View>
          <View style={styles.boxContainer}>
            <Image style={styles.imagem} source={require('../assets/images/logo.png')} />
            <Text style={styles.logoText}>MilkPoint</Text>
            <TextInput
              style={styles.boxInput}
              autoFocus
              placeholder="Email"
              autoCapitalize='none'
              keyboardType='email-address'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

            <TextInput
              style={styles.boxInput}
              placeholder="Senha"
              autoCapitalize='none'
              secureTextEntry={true}
              value={this.state.senha}
              onChangeText={senha => this.setState({ senha })}
            />

            <TouchableOpacity
              onPress={() => this.login()}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  boxInput: {
    backgroundColor: "#DDD",
    alignSelf: "stretch",
    height: 40,
    margin: 5,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 20,
    backgroundColor: 'black',
    height: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  boxContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  imagem: {
    margin: 10,
    width: 120,
    height: 120,
  },
  logoText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  spinnerTextStyle : {
    backgroundColor: 'white',
    fontSize: 20,
  },
});
