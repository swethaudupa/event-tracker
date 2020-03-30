import React from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import SortableRow from '../components/SortableRowComponent';
import SortableList from 'react-native-sortable-list';
import GestureRecognizer from 'react-native-swipe-gestures';

const window = Dimensions.get('window');

class TrackList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trackData: [],
    };
  }

  componentDidMount() {
    /*  
      On componentDidMount, get user's data and set it in 
      TrackList's component state to show the list
    */
    let currentUser = this.props.screenProps.state.currentUser;
    let userEvents = this.props.screenProps.getCurrentUserData(currentUser);
    if (userEvents.events && userEvents.events.length > 0) {
      this.setState({trackData: userEvents.events});
    }
  }

  componentWillUnmount() {
    /*  
      On componentWillUnmount, the changes made by the user to the 
      track list should be saved to global state using replaceUserEvents
      method. Store the changes only if there's any change made.
      The changes that can be done here are re-ordering the list
      and untracking the event
    */
    let currentUser = this.props.screenProps.state.currentUser;
    let userEvents = this.props.screenProps.getCurrentUserData(currentUser);
    const {trackData} = this.state;
    let stringifyEvents =
      userEvents.events && userEvents.events > 0
        ? JSON.stringify(userEvents.events)
        : null;
    if (stringifyEvents !== JSON.stringify(trackData)) {
      this.props.screenProps.replaceUserEvents(trackData, currentUser);
    }
  }

  _renderRow = ({data, active}) => {
    return (
      <SortableRow
        navigation={this.props.navigation}
        data={data}
        active={active}
        onRowDelete={this._onRowDelete}
      />
    );
  };

  _onRowDelete = data => {
    /*  
      update the TrackList component state when the element from
      the list has been removed
    */
    this.setState({
      trackData: this.state.trackData.filter(function(val) {
        return val.id != data.id;
      }),
    });
  };

  _onRelease = (key, currentOrder) => {
    /*  
      onRelease method from react-native-sortable-list tells us
      if the order of the list has been changed
    */
    let sorted = [];
    currentOrder.forEach(k => {
      this.state.trackData.forEach((item, index) => {
        if (index.toString() === k) {
          sorted.push(item);
        }
      });
    });
    this.setState({trackData: sorted});
  };

  onSwipeLeft = () => {
    this.props.navigation.navigate('Event');
  };

  render() {
    const {trackData} = this.state;
    let isDataPresent = Array.isArray(trackData) && trackData.length;
    return (
      <GestureRecognizer
        style={{flex: 1}}
        onSwipeLeft={state => this.onSwipeLeft(state)}>
        <View style={styles.container}>
          <Text style={styles.title}>Event Tracking List</Text>
          {isDataPresent ? (
            <SortableList
              style={styles.list}
              contentContainerStyle={styles.contentContainer}
              data={trackData}
              renderRow={this._renderRow}
              onReleaseRow={this._onRelease}
              onPressRow={this._onPressRow}
            />
          ) : (
            <Text>No Track events found</Text>
          )}
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 30,
    margin: 20,
    color: '#17252A',
    fontWeight: '400',
    textAlign: 'left',
  },

  list: {
    flex: 1,
    marginBottom: 20,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      },
    }),
  },
});

export default TrackList;
