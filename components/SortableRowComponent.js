import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-fa-icons';

const window = Dimensions.get('window');

class SortableRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            },
          ],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }
  render() {
    const {data, active} = this.props;
    return (
      <Animated.View style={[styles.row, this._style]}>
        <Image source={{uri: data.download_url}} style={styles.image} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.text}>{data.name}</Text>

          <TouchableOpacity
            style={styles.moreDetailsIcon}
            onPress={() => {
              this.props.navigation.navigate('Details', {
                item: data,
              });
            }}>
            <View style={styles.seeDetailsWrapper}>
              <Text style={styles.seeDetailsText}>See Details</Text>
              <Icon
                name="angle-double-right"
                style={{fontSize: 20, color: '#2B7A78'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => {
            this.props.onRowDelete(data);
          }}>
          <Icon name="remove" style={{fontSize: 25, color: '#17252A'}} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 150,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  image: {
    width: 60,
    height: 60,
    marginRight: 30,
    borderRadius: 30,
  },

  text: {
    fontSize: 24,
    color: '#17252A',
  },

  removeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },

  seeDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  moreDetailsIcon: {
    paddingTop: 10,
  },

  seeDetailsText: {
    fontSize: 18,
    paddingRight: 10,
    color: '#2B7A78',
  },
});

export default SortableRow;
