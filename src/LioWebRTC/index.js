import React from 'react';
import PropTypes from 'prop-types';
import Liowebrtc from 'liowebrtc';
import Context from '../LioWebRTCContext';

class LioWebRTC extends React.Component {
  constructor(props) {
    super(props);
    this.webrtc = new Liowebrtc(props.options);
  }

  componentDidMount() {
    const {
      onReady,
      onReceivedPeerData,
      onConnectionReady,
      onCreatedPeer,
      onPeerStreamRemoved,
      onIceConnectionStateChange,
      onSignalingStateChange,
      onLeftRoom,
      onJoinedRoom,
      onPeerMute,
      onReceivedSignalData,
      onPeerUnmute,
      onVideoAdded,
      onVideoRemoved,
      onConnectionError
    } = this.props;

    onReceivedPeerData && this.webrtc.on('receivedPeerData', function(...args) {
      onReceivedPeerData(this, ...args);
    });
    onReady && this.webrtc.on('readyToCall', function(...args) {
      onReady(this, ...args);
    });
    onConnectionReady && this.webrtc.on('connectionReady', function(...args) {
      onConnectionReady(this, ...args);
    });
    onCreatedPeer && this.webrtc.on('createdPeer', function(...args) {
      onCreatedPeer(this, ...args);
    });
    onPeerStreamRemoved && this.webrtc.on('peerStreamRemoved', function(...args) {
      onPeerStreamRemoved(this, ...args);
    });
    onIceConnectionStateChange && this.webrtc.on('iceConnectionStateChange', function(...args) {
      onIceConnectionStateChange(this, ...args);
    });
    onSignalingStateChange && this.webrtc.on('signalingStateChange', function(...args) {
      onSignalingStateChange(this, ...args);
    });
    onLeftRoom && this.webrtc.on('leftRoom', function(...args) {
      onLeftRoom(this, ...args);
    });
    onJoinedRoom && this.webrtc.on('joinedRoom', function(...args) {
      onJoinedRoom(this, ...args);
    });
    onPeerMute && this.webrtc.on('mute', function(...args) {
      onPeerMute(this, ...args);
    });
    onPeerUnmute && this.webrtc.on('unmute', function(...args) {
      onPeerUnmute(this, ...args);
    });
    onReceivedSignalData && this.webrtc.on('receivedSignalData', function(...args) {
      onReceivedSignalData(this, ...args);
    });
    onVideoAdded && this.webrtc.on('videoAdded', function(...args) {
      onVideoAdded(this, ...args);
    });
    onVideoRemoved && this.webrtc.on('videoRemoved', function(...args) {
      onVideoRemoved(this, ...args);
    });
    onConnectionError && this.webrtc.on('connectivityError', function(...args) {
      onConnectionError(this, ...args);
    });
  }

  componentWillUnmount() {
    this.disconnect();
  }

  disconnect = () => {
    this.webrtc.stopLocalVideo();
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
  }

  render() {
    return (
      <div>
        {
          <Context.Provider value={this.webrtc}>{this.props.children}</Context.Provider>
        }
      </div>
    );
  }
}

LioWebRTC.propTypes = {
  options: PropTypes.object,
  onReady: PropTypes.func,
  onJoinedRoom: PropTypes.func,
  onReceivedPeerData: PropTypes.func,
  onConnectionReady: PropTypes.func,
  onCreatedPeer: PropTypes.func,
  onPeerStreamRemoved: PropTypes.func,
  onIceConnectionStateChange: PropTypes.func,
  onSignalingStateChange: PropTypes.func,
  onLeftRoom: PropTypes.func,
  onPeerMute: PropTypes.func,
  onReceivedSignalData: PropTypes.func,
  onPeerUnmute: PropTypes.func,
  onVideoAdded: PropTypes.func,
  onVideoRemoved: PropTypes.func,
  onConnectionError: PropTypes.func
};

LioWebRTC.defaultProps = {
  options: {
    dataOnly: true,
    debug: false
  }
};

export default LioWebRTC;
