import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';
import Retirada from '../../components/Retirada';

export default class RelatorioLatScreen extends React.Component {

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
    }

    async componentDidMount() {

        const apiCall = await fetch('https://milkpoint.herokuapp.com/api/retirada/listatodos');
        const response = await apiCall.json();

        this.setState({
            retiradas: response,
        });

        await AsyncStorage.setItem('@MilkPoint:retiradas', JSON.stringify(this.state.retiradas));
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
                    {this.state.retiradas.map(retirada =>
                        <Retirada key={retirada.id} quantidade={retirada.quantidade} 
                            tanque={retirada.tanque}/>
                    )}
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
      marginTop: 150,
    },
  
    scrollView: {
      paddingTop: 20,
    }
  });

