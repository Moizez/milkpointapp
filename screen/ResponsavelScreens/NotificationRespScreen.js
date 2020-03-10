import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Body, Button, Container, Header, Content, Left, CardItem } from 'native-base';
import * as Config from '../../app.json'

export default class NotificationScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Notificações',
        drawerIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/notification.png')}
            />
        ),
    }

    state = {
        notificacoes: [],
    }

    async componentDidMount() {

        const apiCall = await fetch(
            Config.baseUrl+'/api/responsavel/'+
            await AsyncStorage.getItem("@MilkPoint:id")+
            '/notificacoes'
        )
        const response = await apiCall.json();
    
        this.setState({notificacoes: response});
 
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    {this.state.notificacoes.map(notificacao =>
                        <View >
                            <TouchableOpacity style={styles.boxTanque} onPress={() => {
                                        //notificacao.laticinio == null ? 
                                        this.props.navigation.navigate('DepositosPendentes') 
                                        //</View>/this.props.navigation.navigate('RetiradasPendentes') 
                                    }
                                }>
                                <Body>
                                    <Text>
                                        <Text>Você tem um novo pedido de </Text><Text style={styles.negrito}>{notificacao.laticinio == null ? 'DEPÓSITO' : 'RETIRADA'} {'\n'}</Text>
                                        <Text style={styles.negrito}>Tanque: </Text><Text> {notificacao.tanque.nome}{'\n'}</Text>
                                        <Text style={styles.negrito}>Quantidade: </Text><Text> {notificacao.quantidade}{'\n'}</Text>
                                        <Text style={styles.negrito}>Solicitante: </Text><Text> {notificacao.laticinio == null ? notificacao.produtor.nome : notificacao.leticinio.nome}</Text>
                                    </Text>
                                </Body>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    icon: {
        width: 35,
        height: 35,
    },

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

    boxTanque: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        alignItems: 'stretch',
        borderColor: '#A4A4A4',
        borderWidth: 1,
        padding: 20,
        margin: 15,
    },

    negrito: {
        fontWeight: 'bold',
    },
    
});

