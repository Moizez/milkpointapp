import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import TanqueScreen from '../TanqueScreens/TanqueScreen';


export default class HomeProdScreen extends React.Component {

  state = {
    tanques: [],
    produtor: {
      id: '',
      nome: '',
      email: '',
      cpf: '',
    }
  };

  async componentDidMount() {

    const apiCall = await fetch('https://milkpoint.herokuapp.com/api/tanque');
    const response = await apiCall.json();

    this.setState({
      tanques: response,
      produtor: {
        id: await AsyncStorage.getItem("@MilkPoint:id"),
        nome: await AsyncStorage.getItem("@MilkPoint:nome"),
        email: await AsyncStorage.getItem("@MilkPoint:email"),
        cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
      },
    });
    await AsyncStorage.setItem('@MilkPoint:tanques', JSON.stringify(tanques));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Text style={styles.headerText}>Milk Point</Text>
          <View>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
          </View>
        </Header>
        <View style={{ borderBottomColor: '#A4A4A4', borderBottomWidth: 1 }} />
        <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          {this.state.tanques.map(tanque =>
            <TouchableOpacity key={tanque.id}
              onPress={() => this.props.navigation.navigate('DetalhesTanque', { tanque: tanque })}>
              <TanqueScreen nome={tanque.nome} qtdRestante={tanque.qtdRestante}
                localizacao={tanque.localizacao} responsavel={tanque.responsavel.nome} 
                qtdAtual={tanque.qtdAtual} capacidade={tanque.capacidade}/>
            </TouchableOpacity>)}
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
  }
});