import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

export default class ConfigurationScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Configuração',
        drawerIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../../assets/images/config.png')}
            />
        ),
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Tela de Configuração</Text>
            </View>

        );



    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 35,
        height: 35,
    },

})

