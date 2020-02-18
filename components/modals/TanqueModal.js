import React from 'react';
import { StyleSheet, View, Modal, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default class TanqueModal extends React.Component {

    state = {
        quantidade: '',
    };

    render() {
        return (
            <Modal visible={this.props.visible} animationType='slide' transparent={true} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>

                    <TextInput
                        style={styles.boxInput}
                        placeholder='Quantidade em litros (L)'
                        keyboardType='numeric'
                        value={this.state.quantidade}
                        onChangeText={quantidade => this.setState({ quantidade })}
                    />

                    <View style={styles.button}>
                        <TouchableOpacity style={styles.saveButton} onPress={() =>
                            this.props.onAdd(this.state.quantidade)}>
                            <Text style={styles.textButton}>Adicionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.onCancel()}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        height: 140,
        marginTop: 306,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        borderColor: '#A4A4A4',
        borderWidth: 1,

    },

    boxInput: {
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        height: 40,
        width: 261,
        margin: 5,
        borderRadius: 5,
    },

    button: {
        flexDirection: 'row',
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