import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const Landing = ({navigation, screenProps}) => {
  const [name, setName] = useState('');
  const handleNameSubmit = async () => {
    //Throw an alert if the user name is empty
    if (name === '') {
      Alert.alert('Error', 'Please enter your name', {text: 'OK'});
    } else {
      //Call the global state method setCurrentUser when a new user logs in
      screenProps.setCurrentUser(name.toString());
      navigation.navigate('Event');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Enter Your Name"
        placeholderTextColor="#2B7A78"
        autoCapitalize="none"
        onChangeText={text => {
          setName(text);
        }}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleNameSubmit();
        }}>
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    width: 250,
    padding: 10,
    borderColor: '#2B7A78',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#2B7A78',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
});

export default Landing;
