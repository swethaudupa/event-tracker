import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import ImageComponent from '../components/ImageComponent';

const data = [
  {
    name: 'Metallica Concert',
    venue: 'Palace Grounds',
    type: 'Paid',
    date: 'Dec 15, 2020',
  },
  {
    name: 'Saree Exhibition',
    venue: 'Malleswaram Grounds',
    type: 'Free',
    date: 'Aug 15, 2020',
  },
  {
    name: 'Wine tasting event',
    venue: 'Links Brewery',
    type: 'Paid',
    date: 'Apr 15, 2020',
  },
  {
    name: 'Startups Meet',
    venue: 'Kanteerava Indoor Stadium ',
    type: 'Paid',
    date: 'May 15, 2021',
  },
  {
    name: 'Summer Noon Party',
    venue: 'Kumara Park',
    type: 'Paid',
    date: 'Nov 12, 2020',
  },
  {
    name: 'Rock and Roll nights',
    venue: 'Sarjapur Road',
    type: 'Paid',
    date: 'Oct 17, 2020',
  },
  {
    name: 'Barbecue Fridays',
    venue: 'Whitefield',
    type: 'Paid',
    date: 'Sep 25, 2020',
  },
  {
    name: 'Barbecue Fridays',
    venue: 'Whitefield',
    type: 'Paid',
    date: 'Aug 23, 2020',
  },
  {
    name: 'Summer workshop',
    venue: 'Indiranagar',
    type: 'Free',
    date: 'Dec 16, 2020',
  },
  {
    name: 'Impressions & Expressions',
    venue: 'MG Road',
    type: 'Free',
    date: 'Jul 15, 2020',
  },
  {
    name: 'IItalian carnival',
    venue: 'Electronic City',
    type: 'Free',
    date: 'Jun 15, 2020',
  },
];

export default class EventList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      eventData: null,
      loading: true,
      gridView: true,
      btnText: 'Show List',
    };
  }

  componentDidMount() {
    //Getting random pictures from picsum to show in the list
    fetch('https://picsum.photos/v2/list?page=2&limit=12')
      .then(response => response.json())
      .then(responseJson => {
        const eventData = data.map((obj, i) => ({...obj, ...responseJson[i]}));
        this.setState({eventData: eventData, loading: false});
      })
      .catch(error => {
        console.error(error);
      });
  }

  changeView = () => {
    // Toggle grid and list view on click of the button
    this.setState({gridView: !this.state.gridView}, () => {
      if (this.state.gridView) {
        this.setState({btnText: 'Show List'});
      } else {
        this.setState({btnText: 'Show Grid'});
      }
    });
  };

  goToDetailsScreen = item => {
    /*  
      Send the clicked item as second param in 
      navigation to be used in the details screen
    */
    this.props.navigation.navigate('Details', {
      item: item,
    });
  };

  onSwipeRight = () => {
    /*  
      Using react-native-swipe-gestures to switch between the
      screens when swiped right
    */
    this.props.navigation.navigate('Tracking');
  };

  render() {
    const {btnText, eventData, gridView, loading} = this.state;
    return (
      <GestureRecognizer
        navigation={this.props.navigation}
        style={{flex: 1}}
        onSwipeLeft={state => this.onSwipeRight(state)}>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonDesign}
                onPress={this.changeView}>
                <Text style={styles.buttonText}>{btnText}</Text>
              </TouchableOpacity>

              <FlatList
                keyExtractor={item => item.id}
                key={gridView ? 1 : 0}
                numColumns={gridView ? 2 : 1}
                data={eventData}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => this.goToDetailsScreen(item)}>
                    <View style={{flex: 1}}>
                      <ImageComponent
                        imageURI={item.download_url}
                        name={item.name}
                        venue={item.venue}
                        type={item.type}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
          )}
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    paddingTop: 10,
    fontSize: 18,
    color: '#17252A',
  },
  buttonDesign: {
    padding: 15,
    backgroundColor: '#3AAFA9',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
});
