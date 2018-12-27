# react-liowebrtc

> A React component library that makes it easy to add p2p communication into components via LioWebRTC.

[![NPM](https://img.shields.io/npm/v/react-liowebrtc.svg)](https://www.npmjs.com/package/react-liowebrtc)
## Install

```bash
npm i react-liowebrtc --save
```
Or
```bash
yarn add react-liowebrtc
```

## Demo
https://react-liowebrtc.netlify.com

## Usage

### Example Component (Data Channels only)

```jsx
import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc'
import MyComponent from './MyComponent';

class Example extends Component {

  handlePeerData = (webrtc, type, payload, peer) => {
    if (type === 'event-label') {
      console.log(payload);
    }
  }

  render () {
    return (
      <LioWebRTC
        options={{ dataOnly: true }}
        onReady={this.joinRoom}
        onCreatedPeer={this.handleCreatedPeer}
        onReceivedPeerData={this.handlePeerData}
        onRemovedPeer={this.handlePeerLeft}
      >
        <MyComponent />
      </LioWebRTC>
    )
  }
}
```

#### MyComponent

```jsx
import React, { Component } from 'react';
import { withWebRTC } from 'react-liowebrtc';

class MyComponent extends Component {

  handleClick = () => this.props.webrtc.shout('event-label', 'payload');

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Click Me
        </button>
      </div>
    );
  }
}

export default withWebRTC(MyComponent);
```

### Video Chat Example
```jsx
import React, { Component } from 'react';
import { LioWebRTC, LocalVideo, RemoteVideo } from 'react-liowebrtc'
import MyComponent from './MyComponent';

class ExampleVideoChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peers: []
    };
  }

  join = (webrtc) => webrtc.joinRoom('video-chat-room-arbitrary-name');

  handleCreatedPeer = (webrtc, peer) => {
    this.setState({ peers: [...this.state.peers, peer] });
  }

  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
  }

  generateRemotes = () => this.state.peers.map((peer) => (
      <RemoteVideo key={`remote-video-${peer.id}`} peer={peer} />
    );
  });

  render () {
    return (
      <LioWebRTC
        options={{ debug: true }}
        onReady={this.join}
        onCreatedPeer={this.handleCreatedPeer}
        onRemovedPeer={this.handleRemovedPeer}
      >
        <LocalVideo />
        {
          this.state.peers &&
          this.generateRemotes()
        }
      </LioWebRTC>
    )
  }
}

export default ExampleVideoChat;
```

## Component Props

### LioWebRTC Component
```jsx
LioWebRTC.propTypes = {
  options: PropTypes.object, // Initializing options passed into the liowebrtc library
  onReady: PropTypes.func, // Event listeners
  onJoinedRoom: PropTypes.func, // When we successfully join a room
  onReceivedPeerData: PropTypes.func, // When we receive a shout or whisper from a peer
  onChannelOpen: PropTypes.func, // When a new data channel is established with a peer
  onConnectionReady: PropTypes.func, // When the signaling connection is ready
  onCreatedPeer: PropTypes.func, // When a new peer connects
  onPeerStreamAdded: PropTypes.func, // When a peer media stream is added
  onPeerStreamRemoved: PropTypes.func, // When a peer media stream is removed
  onIceConnectionStateChange: PropTypes.func, // When the connection state with a peer changes
  onSignalingStateChange: PropTypes.func, // When the connection to the signaling server changes
  onLeftRoom: PropTypes.func, // When exited the room
  onPeerMute: PropTypes.func, // When a peer mutes themselves
  onReceivedSignalData: PropTypes.func, // When we get a message via the signaling server from a peer
  onPeerUnmute: PropTypes.func, // When a peer unmutes themselves
  onRemovedPeer: PropTypes.func, // When a peer disconnects from us
  onConnectionError: PropTypes.func // When an error occurs in connecting to a peer
};
```
All event emitters pass a webrtc session manager object to the listener functions. For example, the  `onReceivedPeerData` event passes the following objects: `(webrtc, type, data, peer)`. The `onCreatedPeer` event passes `(webrtc, peer)`. Take a look at the [LioWebRTC docs](https://github.com/lazorfuzz/liowebrtc) for more information on LioWebRTC's events and methods.  All events emitted by LioWebRTC will have a preceding webrtc object when using react-liowebrtc.

### LocalVideo Component
```jsx
LocalVideo.propTypes = {
  videoProps: PropTypes.object, // props passed to the inner video element
};
```

### RemoteVideo Component
```jsx
RemoteVideo.propTypes = {
  videoProps: PropTypes.object, // props passed to the inner video element
  peer: PropTypes.instanceOf(Peer) // the Peer instance
};
```

These props are needed to initialize and set event listeners for the liowebrtc library. Take a look at the [liowebrtc](https://github.com/lazorfuzz/liowebrtc) docs for more info.

For more info, please take a look at this [tutorial](https://medium.com/@leontosy/building-a-p2p-web-app-with-react-and-liowebrtc-6a7e8c621085) showing how to build a chat room with react-liowebrtc.

## License

MIT © [lazorfuzz](https://github.com/lazorfuzz)
