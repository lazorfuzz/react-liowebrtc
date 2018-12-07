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

### Example Component

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
        onReady={this.joinRoom}
        onCreatedPeer={this.handleCreatedPeer}
        onReceivedPeerData={this.handlePeerData}
        onPeerStreamRemoved={this.handlePeerLeft}
      >
        <MyComponent />
      </LioWebRTC>
    )
  }
}
```

### MyComponent

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

## Props

```jsx
LioWebRTC.propTypes = {
  options: PropTypes.object, // Initializing options passed into the liowebrtc library
  onReady: PropTypes.func, // Event listeners
  onJoinedRoom: PropTypes.func,
  onReceivedPeerData: PropTypes.func,
  onConnectionReady: PropTypes.func,
  onCreatedPeer: PropTypes.func,
  onPeerStreamAdded: PropTypes.func,
  onPeerStreamRemoved: PropTypes.func,
  onIceConnectionStateChange: PropTypes.func,
  onSignalingStateChange: PropTypes.func,
  onLeftRoom: PropTypes.func,
  onPeerMute: PropTypes.func,
  onReceivedSignalData: PropTypes.func,
  onPeerUnmute: PropTypes.func,
  onRemovedPeer: PropTypes.func,
  onConnectionError: PropTypes.func
};
```

These props are needed to initialize and set event listeners for the liowebrtc library. Take a look at the [liowebrtc](https://github.com/lazorfuzz/liowebrtc) docs for more info.

## License

MIT © [lazorfuzz](https://github.com/lazorfuzz)
