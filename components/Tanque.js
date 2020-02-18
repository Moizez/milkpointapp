import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Tanque extends React.Component {

    render() {
        return (
            <View style={styles.box}>
                <Text style={styles.bold}>Nome do Tanque: {this.props.nome}</Text>
                <Text style={styles.bold}>Capacidade: {this.props.capacidade}</Text>
                <Text style={styles.bold}>Restante: {this.props.qtdRestante}</Text>
                <Text style={styles.bold}>Responsavel: {this.props.responsavel}</Text>
                <Text style={styles.bold}>Localização: {this.props.localizacao}</Text>
                <Text style={styles.bold}>Quantidade Atual: {this.props.qtdAtual}</Text>
                <Text style={styles.bold}>Descrição: {this.props.descricao}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },

    item: {
        fontSize: 14,
    },

    bold: {
        fontWeight: 'bold',
        color: 'black',
    },

});