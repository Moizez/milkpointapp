import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class RetiradaResp extends React.Component {

    render() {
        return (
            <View style={this.props.status == 'Cancelado' ? styles.boxinativo : (
                this.props.status == 'Confirmado'? styles.boxativo : styles.box
                )}>
                <Text style={styles.bold}>Quantidade: {this.props.quantidade}</Text>
                <Text style={styles.bold}>Nome do Laticinio: {this.props.laticinio}</Text>
                <Text style={styles.bold}>Status: {this.props.status}</Text>
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

    boxativo: {
        backgroundColor: '#ACA',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },

    boxinativo: {
        backgroundColor: '#DAA',
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