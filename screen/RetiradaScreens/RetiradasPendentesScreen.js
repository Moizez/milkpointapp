import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import RetiradaScreen from './RetiradaScreen';


export default class RetiradaPendentesScreen extends React.Component {

  state = {
    retiradas: [],
    responsavel: {
        id: '',
        nome: '',
        email: '',
        cpf: '',
    },
    modalVisible: false,
  };

  async componentDidMount() {

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada/listapendentes')
    const response = await apiCall.json();

    this.setState({retiradas: response});

    this.setState({
      responsavel: {
        id: await AsyncStorage.getItem("@MilkPoint:id"),
        nome: await AsyncStorage.getItem("@MilkPoint:nome"),
        email: await AsyncStorage.getItem("@MilkPoint:email"),
        cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
      }
    }) 
  }

  onConfirmeRetirada = async (confirmacao, idRetirada) => {
    const data = new FormData();
    data.append("confirmacao", confirmacao);
    data.append("idRetirada", idRetirada);

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada/confirmacao',
    {
      method: 'POST',
      body: data
    })

    const response = await apiCall.json();
    
    this.setState({
      modalVisible: false
    });

    if(confirmacao) {
      alert("Pedido Confirmado Com Sucesso!" + "\n" + "Veja sempre a quantidade restante!")
    }
    else {
      alert("Pedido Cancelado Com Sucesso!" + "\n" + "Veja sempre a quantidade restante!")
    }

    this.componentDidMount();

  };

  render() {
    return (
      <Container style={styles.container}>
        <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            {this.state.retiradas.map(retirada =>
                <View>
                  <RetiradaScreen key={retirada.id} quantidade={retirada.quantidade} laticinio={retirada.laticinio.nome}
                    onConfirmeRetirada={this.onConfirmeRetirada} idRetirada={retirada.id}/>
                </View>
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
    marginTop: 150,
  },

  scrollView: {
    paddingTop: 20,
  },

  
});