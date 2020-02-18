import React from 'react';
import { StyleSheet, View} from 'react-native';
import Tanque from '../../components/Tanque';

export default class CapacityTankScreen extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Tanque capacidade={this.props.navigation.getParam('tanque').capacidade} 
          localizacao={this.props.navigation.getParam('tanque').localizacao} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
