import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-fa-icons';
const windowHeight = Dimensions.get('window').height;

const DetailsScreen = ({navigation, screenProps}) => {
  const [isTracking, setIsTracking] = useState(false);
  const item = navigation.getParam('item');

  useEffect(() => {
    /*  
      Use the global state method getCurrentUserData to get the
      user's events to check if the event is being tracked or not.
      If tracked, disable track button
    */
    let currentUser = screenProps.state.currentUser;
    let userEvents = screenProps.getCurrentUserData(currentUser);
    const currentEvent = navigation.getParam('item');
    if (
      userEvents.events &&
      userEvents.events.length > 0 &&
      userEvents.events.map(x => x.id).indexOf(currentEvent.id) != -1
    ) {
      setIsTracking(true);
    }
  }, []);

  const onTrackEvent = () => {
    /*  
      On click of track event button, call updateUserEvents
      to update the user's event data in the global state
    */
    const currentEvent = navigation.getParam('item');
    screenProps.updateUserEvents(currentEvent, screenProps.state.currentUser);
    navigation.goBack();
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.detailsWrapper}>
        <Text style={styles.detailsNameStyle}>{item.name}</Text>
        <View style={styles.detailsImageWrapper}>
          <Image
            source={{uri: item.download_url}}
            resizeMode={'cover'}
            style={styles.detailsImage}
          />
          <View style={styles.detailsTextWrapper}>
            <View style={styles.detailsCardWrapper}>
              <View style={{flexDirection: 'column'}}>
                <View style={styles.detailsIconWrapper}>
                  <Icon name="map-marker" style={{fontSize: 20}} />
                  <Text style={styles.detailsText}> {item.venue}</Text>
                </View>
                <View style={styles.detailsIconWrapper}>
                  <Icon name="calendar" style={{fontSize: 20}} />
                  <Text style={styles.detailsText}> {item.date}</Text>
                </View>
                <View style={styles.detailsIconWrapper}>
                  <Icon name="rupee" style={{fontSize: 20}} />
                  <Text style={styles.detailsText}> {item.type}</Text>
                </View>
              </View>
              <TouchableOpacity
                disabled={isTracking ? true : false}
                onPress={() => {
                  onTrackEvent();
                }}
                style={{
                  ...styles.detailsTrackButton,
                  backgroundColor: isTracking ? '#DEF2F1' : '#2B7A78',
                }}
                activeOpacity={0.5}>
                <Text style={{color: isTracking ? '#17252A' : '#FEFFFF'}}>
                  {' '}
                  {isTracking ? 'Tracking' : 'Track'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsWrapper: {
    flex: 1,
    position: 'relative',
    ...Platform.select({
      android: {
        height: windowHeight,
      },
    }),
  },
  detailsImageWrapper: {
    width: '100%',
    height: 400,
  },
  detailsImage: {
    flex: 1,
    width: null,
    height: null,
  },
  detailsTextWrapper: {
    shadowOffset: {width: 5, height: 3},
    shadowColor: '#3AAFA9',
    shadowOpacity: 0.2,
    backgroundColor: '#FFFFFF',
    height: 200,
    shadowRadius: 2,
    justifyContent: 'center',
    position: 'absolute',
    left: 15,
    bottom: -150,
    right: 15,
    elevation: 1,
  },
  detailsNameStyle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#17252A',
    margin: 20,
  },
  detailsText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#17252A',
    paddingLeft: 5,
  },
  detailsTrackButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 400,
  },
  detailsIconWrapper: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
  },
  detailsCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default DetailsScreen;
