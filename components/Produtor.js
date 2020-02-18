import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Tanque extends React.Component {

    render() {
        return (
            <View style={styles.box}>
                <View style={styles.item}>
                    <Text >{this.props.id}</Text>
                    <Text style={styles.bold}>Nome do Produtor: </Text><Text>{this.props.nome}</Text>
                    <Text style={styles.bold}>Apelido: </Text><Text>{this.props.apelido}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    item: {
        fontSize: 14,
    },

    bold: {
        fontWeight: 'bold',
        color: 'black',
    },

    perfil: {
        justifyContent: 'center',
        width: 25,
        height: 25,
    },

    delete: {
        width: 25,
        height: 25,
    },

    avatar: {
        alignSelf: 'center',
        width: 40,
        height: 40,
    }

});