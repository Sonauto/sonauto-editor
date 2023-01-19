import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Scrubber from 'react-native-scrubber'
import { Audio } from 'expo-av';

class AudioPlayer extends Component {
  constructor() {
    super();
    this.state = {
      scrubberValue: 0,
      totalDuration: 0,
      isPlaying: false,
      isBuffering: false,
    }
  }

  async componentDidMount() {
    // Load the sound and play it
    this.sound = new Audio.Sound();
    try {
      let status = await this.sound.loadAsync({ uri: 'https://cdn.discordapp.com/attachments/978509956426915850/1050588335468453998/sample_0_sample_645932_2b127b5510a079a60b97.wav' });
      console.log("sound loaded, ", status )
      
      // Set the playback status update callback
      this.sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.sound.setOnAudioSampleReceived((audio) => console.log("Object ", audio))
    } catch (error) {
      console.log(`Encountered an error while loading the sound: ${error}`);
    }
  }
  componentWillUnmount() {
    this.sound.unloadAsync();
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else {
      console.log("update")
      this.setState({
        scrubberValue: playbackStatus.positionMillis / 1000,
        isPlaying: playbackStatus.isPlaying,
        isBuffering: playbackStatus.isBuffering,
      });
    }
  }

  valueChange = value => {
    console.log(value)
    this.setState({ scrubberValue: value });
    this.sound.setStatusAsync({ positionMillis: value * 1000 });
  }

  togglePlayback = async () => {
    if(this.state.isPlaying) {
      this.sound.pauseAsync();
    } else {
      let status = await this.sound.playAsync();
      console.log(status)
      // Set the total duration and start updating the scrubber value
      if (!this.state.durationMillis) this.setState({ totalDuration: status.durationMillis / 1000 });
      this.setState({ 
        scrubberValue: status.positionMillis / 1000,
      })
    }
  }

  render() {
    return (
      <>
        <Scrubber 
          value={this.state.scrubberValue}
          totalDuration={this.state.totalDuration}
          onSlidingComplete={this.valueChange}
          trackColor='red'
          scrubbedColor='salmon'
        />
        <Text onPress={this.togglePlayback}>{this.state.isPlaying ? 'Pause' : 'Play'}</Text>
      </>
    );
  }
}

export default AudioPlayer;