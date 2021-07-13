import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  View,
  Text,
  // StatusBar,
} from 'react-native';

import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function App() {
  const [userName, setUserName] = useState('');
  const [callLink, setCallLink] = useState('');
  const [callStarted, setCallStarted] = useState(false);
  // const [showJitsi, setShowJitsi] = useState(true);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('onConferenceTerminated: ', {nativeEvent});
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onConferenceJoined: ', {nativeEvent});

    // setShowJitsi(false);
    // setTimeout(() => {
    //   setShowJitsi(true);
    // }, 100);

    // StatusBar.setHidden(false, 'none'); // don't remove
    // StatusBar.setTranslucent(false); // don't remove
    // StatusBar.setBackgroundColor('#000000'); // you can remove
    // StatusBar.setBarStyle('light-content'); // you can remove
    // setTimeout(() => {
    //   StatusBar.setHidden(true, 'none'); // this might be false if you want to show statusbar
    //   StatusBar.setTranslucent(true); // don't remove
    //   StatusBar.setBackgroundColor('#000000'); // you can remove
    //   StatusBar.setBarStyle('light-content'); // you can remove
    // }, 100);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onConferenceWillJoin:', {nativeEvent});
  }

  const startCall = () => {
    if (userName !== '' && callLink !== '') {
      setCallStarted(true);
      setTimeout(() => {
        const url = `https://video.circleit.com/${callLink}`;
        const userInfo = {
          displayName: userName,
          email: 'user@example.com',
          avatar: 'https:/gravatar.com/avatar/abc123',
        };
        JitsiMeet.call(url, userInfo);
      }, 2000);
    }
  };

  if (!callStarted) {
    JitsiMeet.endCall();
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Join a call</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder="Enter your name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCallLink}
          value={callLink}
          placeholder="Enter call link"
        />
        <View style={styles.buttonWrapper}>
          <Button title="Start Call" onPress={startCall} />
        </View>
      </KeyboardAvoidingView>
    );
  }
  if (callStarted) {
    return (
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={styles.callContainer}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  callContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  text: {textAlign: 'center'},
  buttonWrapper: {
    marginTop: 30,
    minWidth: 200,
    alignSelf: 'center',
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default App;
