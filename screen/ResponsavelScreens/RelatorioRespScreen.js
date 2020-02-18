import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import RetiradaResp from '../../components/RetiradaResp';
import DepositoResp from '../../components/DepositoResp';

export default class RelatorioScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Relatório',
        drawerIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/relatory.png')}
            />
        ),
    }

    state = {
        retiradas: [],
        depositos: [],
    }

    async componentDidMount() {

        const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos');
        const response = await apiCall.json();

        this.setState({
            retiradas: response,
        });

        const apiCall2 = await fetch('https://milkpoint.herokuapp.com/api/deposito/listatodos');
        const response2 = await apiCall2.json();

        this.setState({
            depositos: response2,
        })
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
                    <View style={styles.corpo}>
                        <Text style={styles.headerText}>Retiradas</Text>
                        {this.state.retiradas.map(retirada =>
                            <RetiradaResp key={retirada.id} quantidade={retirada.quantidade}
                                laticinio={retirada.laticinio.nome} />
                        )}
                    </View>
                    <View style={styles.corpo}>
                        <Text style={styles.headerText}>Depositos</Text>
                        {this.state.depositos.map(deposito =>
                            <DepositoResp key={deposito.id} quantidade={deposito.quantidade}
                                produtor={deposito.produtor.nome} />
                        )}
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

    icon: {
        width: 35,
        height: 35,
    },

    scrollView: {
        paddingTop: 20,
    },

    headerText: {
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },

    corpo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginHorizontal: 8,
        marginVertical: 8,
        width: 60,
        height: 60,
    },

})