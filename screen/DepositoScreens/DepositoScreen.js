import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class DepositoScreen extends React.Component {

    state = {
        true: true,
        false: false
    }
    
    render() {
        return (
            <View style={styles.boxTanque}>
                <View>
                    <Text style={styles.bold}>Quantidade:</Text><Text> {this.props.quantidade}</Text>
                    <Text style={styles.bold}>Produtor:</Text><Text> {this.props.produtor}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.saveButton} onPress={() =>
                        this.props.onConfirmeDeposito(this.state.true, this.props.idDeposito)}>
                        <Text style={styles.textButton}>Confirmar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => 
                        this.props.onConfirmeDeposito(this.state.false, this.props.idDeposito)}>
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    boxTanque: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        alignItems: 'stretch',
        borderColor: '#A4A4A4',
        borderWidth: 1,
        padding: 20,
        margin: 15,
    },

    boxResp: {
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

    saveButton: {
        marginRight: 20,
        borderRadius: 5,
        width: 120,
        marginTop: 20,
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#2E9AFE',
    },
    
      cancelButton: {
          borderRadius: 5,
          width: 120,
          marginTop: 20,
          padding: 8,
          alignItems: 'center',
          backgroundColor: '#FA5858',
    },

});