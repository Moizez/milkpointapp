import React from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LogoutScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sair',
        drawerIcon: ({ tintColor }) => (
            <Image
                style={styles.icon}
                source={require('../assets/images/logout.png')}
            />
        ),
    }

    constructor(props) {
        super(props);
        this.init();
      }
    
    init = async () => {
        await AsyncStorage.removeItem("@MilkPoint:email");
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }

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

