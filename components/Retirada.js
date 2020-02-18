import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Retirada extends React.Component {

    render() {
        return (
            <View style={styles.box}>
                <Text style={styles.bold}>Quantidade: {this.props.quantidade}</Text>
                <Text style={styles.bold}>Nome do Tanque: {this.props.tanque.nome}</Text>
                <Text style={styles.bold}>Nome do Responsavel: {this.props.tanque.responsavel.nome}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#FFF',
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