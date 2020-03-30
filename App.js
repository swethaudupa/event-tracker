import React, {useState, useEffect} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Landing from './screens/Landing';
import EventList from './screens/EventList';
import EventDetails from './screens/EventDetails';
import TrackList from './screens/TrackList';

import AsyncStorage from '@react-native-community/async-storage';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Landing,
    },
    Event: {
      screen: EventList,
    },
    Details: {
      screen: EventDetails,
    },
    Tracking: {
      screen: TrackList,
    },
  },
  {
    defaultNavigationOptions: () => ({
      cardStyle: {
        backgroundColor: '#FEFFFF',
      },
    }),
  },
  {
    initialRouteName: 'Home',
  },
);
const AppContainer = createAppContainer(RootStack);

const INITIAL_STATE = {
  currentUser: '',
  users: [],
  userData: {},
};

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    /* 
      get the data from AsyncStorage when the app component mounts
      Check if there are users exists, then update the app initial 
      state to this data
    */
    async function getUserEvents() {
      try {
        let userEvents = await AsyncStorage.getItem('userEvents');
        let formattedUserEvents = JSON.parse(userEvents);
        if (
          formattedUserEvents !== null &&
          formattedUserEvents.users &&
          formattedUserEvents.users.length > 0
        ) {
          setState(formattedUserEvents);
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserEvents();
  }, []);

  /* 
      Set a global state in the root component to make all the child
      components get access to the methods and state so that it can be 
      modified. Using screenProps od react-navigation to pass the data to
      its children. SetItem on AsyncStorage whenever the state updates
  */
  const setCurrentUser = name => {
    const isUserPresent = state.users.includes(name);
    const newState = {
      ...state,
      currentUser: name,
      users: isUserPresent ? state.users : [...state.users, name],
      userData: {
        ...state.userData,
        [name]: {
          events: isUserPresent ? [...getCurrentUserData(name).events] : [],
        },
      },
    };

    setState(newState);
    AsyncStorage.setItem('userEvents', JSON.stringify(newState));
  };

  const getCurrentUserData = name => {
    return state.userData[name];
  };

  const updateUserEvents = (newEvent, name) => {
    const currentUserData = state.userData[name];
    const newState = {
      ...state,
      userData: {
        ...state.userData,
        [name]: {
          ...currentUserData,
          events: [...currentUserData.events, newEvent],
        },
      },
    };

    setState(newState);
    AsyncStorage.setItem('userEvents', JSON.stringify(newState));
  };

  const replaceUserEvents = (newEvents, name) => {
    const currentUserData = state.userData[name];
    const newState = {
      ...state,
      userData: {
        ...state.userData,
        [name]: {
          ...currentUserData,
          events: newEvents,
        },
      },
    };
    setState(newState);
    AsyncStorage.setItem('userEvents', JSON.stringify(newState));
  };
  return (
    <AppContainer
      screenProps={{
        state,
        setCurrentUser,
        getCurrentUserData,
        updateUserEvents,
        replaceUserEvents,
      }}
    />
  );
};

export default App;
