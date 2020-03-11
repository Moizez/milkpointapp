import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
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
        JSON.stringify(apiCall.status) == 200 ?
        response = await apiCall.json() :
        response = {};

        this.setState({notificacoes: response});
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <ScrollView ontentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    {this.state.notificacoes.map(notificacao => 
                        <TouchableOpacity  style={styles.box} onPress={ () => 
                            this.props.navigation.navigate(
                                notificacao.tipo == 'RETIRADA' ?
                                'RetiradasPendentes' :
                                'DepositosPendentes'
                                )
                            }
                        >
                            <Text>
                                Você tem um novo pedido de <Text style={styles.negrito}>{notificacao.tipo}</Text>{'\n'}
                                Tanque: <Text style={styles.negrito}>{notificacao.tanque}</Text>{'\n'}
                                Qauntidade: <Text style={styles.negrito}>{notificacao.quantidade}</Text> Litros{'\n'}
                                Solicitante: <Text style={styles.negrito}>{notificacao.solicitante}</Text>
                            </Text>
                        </TouchableOpacity>
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

    box: {
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

