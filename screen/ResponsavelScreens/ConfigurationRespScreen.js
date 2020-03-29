import React from 'react';
import { Switch, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Icon, Card, CardItem, Body, Left, Right, TabHeading } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Config from '../../app.json';

export default class ConfigurationScreen extends React.Component {

    state = {
        spinner: false,
        user: {
          id: '',
          nome: '',
          email: '',
          cpf: '',
          telefone: '',
          perfil: '',
          sms : '',
        },
    }
    
    static navigationOptions = {
        drawerLabel: 'Configuração',
        drawerIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/config.png')}
            />
        ),
    }

    changeSms = (value) => {this.up(value)};

    async up(value) {
        this.setState({spinner : true});
        const apiCall = await fetch(Config.baseUrl+'/api/responsavel/'+this.state.user.id+'/sms/'+value);
        const response = await apiCall.json();
        if (apiCall.status == 200) {
            await this.setState({ user: response });
            await AsyncStorage.setItem('@MilkPoint:sendSms', ""+this.state.user.sms);
        } else {
            alert("Erro ao atualizar!"+JSON.stringify(response));
        }
        this.setState({spinner : false});
    }
    
    async componentDidMount() {
        this.setState({
            user: {
                perfil: await AsyncStorage.getItem("@MilkPoint:perfil"),
                id: await AsyncStorage.getItem("@MilkPoint:id"),
                nome: await AsyncStorage.getItem("@MilkPoint:nome"),
                email: await AsyncStorage.getItem("@MilkPoint:email"),
                cpf: await AsyncStorage.getItem("@MilkPoint:cpf"),
                telefone: await AsyncStorage.getItem("@MilkPoint:telefone"),
                sms: ""+await AsyncStorage.getItem("@MilkPoint:sendSms")
            },
        });
    }

    render() {
        var sendSms = ""+this.state.user.sms == 'true' ? true : false ;
        return (
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Aguarde...'}
                    textStyle={styles.spinnerTextStyle}
                    />
            <Header style={styles.header}>
            <Left>
                <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
            </Left>
            <Text style={styles.headerText}>MilkPoint{'\n'}
                <Text style={{ fontSize: 18 }}>Configurações</Text>
            </Text>
            <View>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            </View>
            </Header>
            <View style={{ borderBottomColor: '#A4A4A4', borderBottomWidth: 1 }} />
            <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                <View>
                <Card>
                    <CardItem bordered>
                    <Body>
                        <Text>
                            {this.state.user.perfil == 1 ?
                            'Produtor' : 
                            (this.state.user.perfil == 2 ?
                                'Responsavel' :
                                'Laticínio'
                                )
                            }: {this.state.user.nome}{'\n'}
                            CPF: {this.state.user.cpf}
                        </Text>
                    </Body>
                    </CardItem>
                    <CardItem bordered>
                        <Text>
                            E-mail: {'\n'}{this.state.user.email}
                        </Text>
                    </CardItem>
                    {''+this.state.user.telefone == '' ? 
                    <CardItem bordered>
                        <Text style={{textAlign : 'center', width : '100%', fontWeight: 'bold'}}>
                            Telefone não cadastrado.
                        </Text>
                    </CardItem> :
                    <CardItem>
                        <Text>
                            Telefone: {this.state.user.telefone}{'\n'}
                            Receber Notificações por SMS: {sendSms}</Text>
                        <Right>
                            <Switch onValueChange={this.changeSms} value={sendSms} />
                        </Right>
                    </CardItem>
                }
                </Card>
                </View>
            </ScrollView>
            </Container>
        );
                    
    };
    
};

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
      marginTop: 100,
    },
  
    scrollView: {
      paddingTop: 20,
    },
  
    title: {
      fontSize: 30,
      padding: 10,
      fontWeight: 'bold',
    },
    
    icon: {
        width: 35,
        height: 35,
    },

  });