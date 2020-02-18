import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class DepositoResp extends React.Component {

    render() {
        return (
            <View style={styles.box}>
                <Text style={styles.bold}>Quantidade: {this.props.quantidade}</Text>
                <Text style={styles.bold}>Nome do Produtor: {this.props.produtor}</Text>
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