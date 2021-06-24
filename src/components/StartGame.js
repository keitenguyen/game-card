import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StartGame = ({onStartGame}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxPlayGame}>
        <TouchableOpacity onPress={onStartGame} style={styles.btnPlay}>
          <Text>
            <Icon name="play" size={30} color="#fff" />
          </Text>
          <Text style={styles.text}>Chơi ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    // width,
    // height,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxPlayGame: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnPlay: {
    borderRadius: 8,
    backgroundColor: 'rgb(233, 71, 86)',
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default StartGame;
