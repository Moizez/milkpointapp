import React from 'react';
import {View, StatusBar, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoadingLoginScreen extends React.Component {

    async componentDidMount() {
      this.init();
    }
  
    init = async () => {

      var id;
      
      try{

        id = await AsyncStorage.getItem("@MilkPoint:id");
        
      }catch(exception){}
      
      if(id){
        perfil = await AsyncStorage.getItem("@MilkPoint:perfil");
      
        if(perfil == 1){
          this.props.navigation.navigate('StackProdutor');
        } else if(perfil == 2){
          this.props.navigation.navigate('StackResponsavel');
        } else if(perfil == 3){
          this.props.navigation.navigate('StackLaticinio');
        } else{
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