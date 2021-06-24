import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {convertSecondsToMMSS} from '../utils/Tools';

const EndGame = ({onStartGame, isWin, timeLeft}) => {
  const win = () => (
    <Text style={styles.textResult}>
      Bạn đã thắng, thời gian còn lại: {convertSecondsToMMSS(timeLeft)}
    </Text>
  );
  const lose = () => <Text style={styles.textResult}>Bạn đã thua!</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.boxPlayGame}>
        {isWin && win()}
        {!isWin && lose()}
        <TouchableOpacity onPress={onStartGame} style={styles.btnPlay}>
          <Text>
            <Icon name="play" size={30} color="#fff" />
          </Text>
          <Text style={styles.text}>Chơi lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    width: '80%',
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
  textResult: {
    marginBottom: 20,
  },
});

export default EndGame;
