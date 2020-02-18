import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Responsavel extends React.Component {

    render() {
        return(
            <View>
                <Text>{this.props.id}</Text>
                <Text>{this.props.nome}</Text>
                <Text>{this.props.apelido}</Text>
                <Text>{this.props.endereco}</Text>
                <Text>{this.props.telefone}</Text>
            </View>
        );
    }
}