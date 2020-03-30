import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const ImageComponent = ({imageURI, name, venue, type}) => {
  return (
    <View style={styles.imageHolder}>
      <Image source={{uri: imageURI}} style={styles.image} />
      <View style={styles.eventTypeWrapper}>
        <Text style={styles.eventTitle}>{type}</Text>
      </View>
      <View style={styles.textViewHolder}>
        <Text numberOfLines={1} style={styles.eventTitle}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.eventDescription}>
          {venue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageHolder: {
    margin: 5,
    height: 160,
    flex: 1,
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  textViewHolder: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  eventTitle: {
    color: '#FEFFFF',
    fontWeight: '600',
  },
  eventDescription: {
    color: '#FEFFFF',
    fontWeight: '300',
  },
  eventTypeWrapper: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default ImageComponent;
