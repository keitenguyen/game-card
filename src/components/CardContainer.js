import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Card from './Card';
import Card1 from '../assets/card1.png';
import Card2 from '../assets/card2.png';
import Card3 from '../assets/card3.png';
import Card4 from '../assets/card4.png';
import Card5 from '../assets/card5.png';
import Card6 from '../assets/card6.png';
import Card7 from '../assets/card7.png';
import Card8 from '../assets/card8.png';
import Card9 from '../assets/card9.png';
import Card10 from '../assets/card10.png';
import Countdown from './Countdown';
import StartGame from './StartGame';
import EndGame from './EndGame';
const background = require('../assets/background.png');

const STATE_START_GAME = 1;
const STATE_PLAY_GAME = 2;
const STATE_END_GAME = 3;
const TIME_PLAY = 300;

const CardContainer = () => {
  const getCardImage = id => {
    let imageNumber = id < 10 ? id + 1 : id - 9;
    switch (imageNumber) {
      case 1:
        return Card1;
      case 2:
        return Card2;
      case 3:
        return Card3;
      case 4:
        return Card4;
      case 5:
        return Card5;
      case 6:
        return Card6;
      case 7:
        return Card7;
      case 8:
        return Card8;
      case 9:
        return Card9;
      case 10:
        return Card10;
    }
  };

  const initData = () => {
    return Array.from({length: 20}, (_, i) => ({
      id: Math.floor(Math.random() * 1000000).toString(),
      number: i + 1,
      isUp: false,
      isDeleted: false,
      imageId: i < 10 ? i + 1 : i - 9,
      imageSource: getCardImage(i),
    }));
  };

  const [data, setData] = useState(initData());
  const [gameState, setGameState] = useState(STATE_START_GAME);
  const [lastOpenCard, setLastOpenCard] = useState(null);
  const [isWin, setIsWin] = useState(false);
  const [seconds, setSeconds] = useState(TIME_PLAY);

  const onItemPress = async card => {
    const cards = [...data];
    const found = cards.find(item => {
      return card.id === item.id;
    });

    if (found) {
      found.isUp = true;
    }
    // mới mở 1 thẻ
    if (lastOpenCard === null) {
      await setLastOpenCard(card);
      await setData(cards);
      return;
    }

    // Mở 2 thẻ thì check
    await setData(cards);
    setTimeout(async () => {
      // Mở 2 thẻ giống nhau thì xoá
      if (lastOpenCard.imageId === card.imageId) {
        for (const item of cards) {
          if (item.imageId === lastOpenCard.imageId) {
            item.isDeleted = true;
            item.isUp = false;
          }
        }
      } else {
        // không giống nhau thì úp thẻ
        for (const item of cards) {
          if (
            item.imageId === lastOpenCard.imageId ||
            item.imageId === card.imageId
          ) {
            item.isUp = false;
          }
        }
      }

      await setLastOpenCard(null);
      await setData(cards);
    }, 500);
  };

  /**
   * Start game
   */
  const onStartGame = () => {
    setGameState(STATE_PLAY_GAME);
    setSeconds(TIME_PLAY);
    setIsWin(false);
    setData(initData());
  };

  const onTimeUp = async () => {
    const cards = data.filter(card => !card.isDeleted);
    if (cards.length) {
      await setIsWin(false);
      await setGameState(STATE_END_GAME);
      await setSeconds(0);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.background}
        resizeMode="cover">
        {gameState === STATE_START_GAME && (
          <StartGame onStartGame={onStartGame} />
        )}

        {gameState === STATE_END_GAME && (
          <EndGame onStartGame={onStartGame} isWin={isWin} timeLeft={seconds} />
        )}

        {gameState === STATE_PLAY_GAME && (
          <ScrollView>
            <Countdown totalTime={seconds} onStopTimer={onTimeUp} />
            <View style={styles.cardContainer}>
              {data.map(
                card =>
                  !card.isDeleted && (
                    <Card key={card.id} item={card} onPress={onItemPress} />
                  ),
              )}
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default CardContainer;
