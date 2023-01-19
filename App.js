import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Sonauto Editor</Text>
      <StatusBar style="auto" />
      <AudioPlayer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
