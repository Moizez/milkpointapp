import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Laticinio extends React.Component {

    render() {
        return(
            <View>
                <Text>{this.props.id}</Text>
                <Text>{this.props.nome}</Text>
                <Text>{this.props.identificacao}</Text>
                <Text>{this.props.endereco}</Text>
                <Text>{this.props.telefone}</Text>
            </View>
        );
    }
}