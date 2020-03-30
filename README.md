# Event Tracker

## About the project
This project aims at getting the user's tracking events.

1. When the user starts the app, he/she is prompted to enter his/her name.
2. The app then shows a page with a list of events in and around the city. You can use
the data provided on the last page (or create your own).
3. The events need to be displayed in two modes, the first mode is like a list. The list
needs to display a thumbnail for the event, the name of the event, the place where it will
be held and if the event has a paid or a free entry. (The entry fee need not be displayed)
4. When the user switches to the second mode the list view is replaced with a grid view.
The thumbnails of the events are displayed in this grid along with the event name.
5. When the user taps on an event he/she is shown another page with Event details,
which includes an event image, event name, location, entry type (paid or free) and a butt
on that allows the event to be tracked by the user.
6. The user should be able to view this list of events that he/she is tracking from any
page by swiping their finger from the right edge of the screen to the left (The user should
be able to dismiss the screen by reversing the gesture).
7. The user should be able to remove an event from the tracking page.
8. The user should be able to view the event details from the tracking page.
9. The user should be able to reorder the list according to his preference.
10. The tracking list should be persistent i.e if the user exits the app and relaunches it,
when the user enters his/her name, it should display the tracking list of that user while
maintaining the order.

## Stack used
- React-Native app<br />
- Uses react-native-swipe-gestures to swipe right to left and and left to right<br />
- react-native-sortable-list to re-order the list<br />
- react-navigation for the navigation<br />
- @react-native-community/async-storage to store user's data even when the app reloads

## Prerequisites
- Node > 7 and npm (Recommended: Use [nvm](https://github.com/creationix/nvm))
- Watchman `brew install watchman`
- React Native CLI `npm install -g react-native-cli`
- XCode > 9
- [JDK > 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Android Studio and Android SDK](https://developer.android.com/studio/index.html)

## Getting started

## Install and run on android
```
npm install -g react-native-cli
cd react-native-quick-sample
npm install
react-native run-android
```

## Install and run on ios
```
npm install -g react-native-cli
cd react-native-quick-sample
npm install
cd ios && pod install
react-native run-ios
```
