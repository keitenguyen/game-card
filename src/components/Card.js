import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const Card = ({item, onPress}) => {
  const onCardPress = () => onPress(item);
  return (
    <View>
      <TouchableOpacity
        disabled={item.isDeleted || item.isUp}
        style={[
          styles.cardContainer,
          !item.isUp && styles.cardClosed,
          item.isDeleted && styles.cardDeleted,
        ]}
        onPress={onCardPress}>
        {item.isUp && <Image source={item.imageSource} style={styles.image} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  cardDeleted: {
    backgroundColor: 'transparent',
  },
  cardClosed: {
    backgroundColor: '#cecece',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
});
export default Card;
