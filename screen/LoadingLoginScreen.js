import React from 'react';
import {View, StatusBar, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoadingLoginScreen extends React.Component {

    async componentDidMount() {
      this.init();
    }
  
    init = async () => {

      var email;
      try{
        email = await AsyncStorage.getItem("@MilkPoint:email");
      }catch(exception){}

      if(email){
        if(email === 'responsavel@gmail.com'){
          this.props.navigation.navigate('StackResponsavel');
        }
        else if(email === 'produtor@gmail.com'){
          this.props.navigation.navigate('StackProdutor');
        }
        else if(email == 'laticinio@gmail.com'){
            this.props.navigation.navigate('StackLaticinio');
        }
        else{
          this.props.navigation.navigate('Login');
        }
      }else{
        this.props.navigation.navigate('Login');
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });