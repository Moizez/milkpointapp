import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';

export default class TanqueScreen extends React.Component {

    render() {
        return (
            <View style={styles.boxTanque}>
                <View>
                    <Text style={styles.bold}>Nome do Tanque:</Text><Text> {this.props.nome}</Text>
                    <Text style={styles.bold}>Restante:</Text><Text> {this.props.qtdRestante}</Text>
                    <Text style={styles.bold}>Localização:</Text><Text> {this.props.localizacao}</Text>
                    <Text style={styles.bold}>Responsavel:</Text><Text> {this.props.responsavel}</Text>
                </View>
                <View style={styles.speedometer}>
                    <Speedometer
                        value={this.props.qtdAtual} //Aqui qtdAtual
                        totalValue={this.props.capacidade} // Aqui a capacidade
                        size={150} 
                        outerColor="#d3d3d3"
                        internalColor="blue"
                        showText                       
                        textStyle={{ color: 'green',  }}
                        showLabels
                        labelStyle={{ color: 'black' }}
                        showPercent
                        percentStyle={{ color: 'red' }}
                    />
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    boxTanque: {
        flexDirection: "row",
        backgroundColor: '#FFF',
        borderRadius: 5,
        alignItems: 'stretch',
        borderColor: '#A4A4A4',
        borderWidth: 1,
        padding: 20,
        margin: 10,
    },

    bold: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'black',
    },

    speedometer: {
        justifyContent: "center",
        paddingLeft: 13,

    },


});