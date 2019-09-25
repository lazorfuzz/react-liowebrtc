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
      onChannelOpen,
      onConnectionReady,
      onCreatedPeer,
      onPeerStreamAdded,
      onPeerStreamRemoved,
      onRemovedPeer,
      onIceConnectionStateChange,
      onSignalingStateChange,
      onLeftRoom,
      onJoinedRoom,
      onPeerMute,
      onReceivedSignalData,
      onPeerUnmute,
      onConnectionError
    } = this.props;

    onReceivedPeerData && this.webrtc.on('receivedPeerData', function(...args) {
      onReceivedPeerData(this, ...args);
    });
    onReady && this.webrtc.on('ready', function(...args) {
      onReady(this, ...args);
    });
    onChannelOpen && this.webrtc.on('channelOpen', function(...args) {
      onChannelOpen(this, ...args);
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
    onPeerStreamAdded && this.webrtc.on('peerStreamAdded', function(...args) {
      onPeerStreamAdded(this, ...args);
    });
    onRemovedPeer && this.webrtc.on('removedPeer', function(...args) {
      onRemovedPeer(this, ...args);
    });
    onConnectionError && this.webrtc.on('connectivityError', function(...args) {
      onConnectionError(this, ...args);
    });
  }

  componentWillUnmount() {
    this.disconnect();
  }

  disconnect = () => {
    try {
      this.webrtc.stopLocalVideo();
      this.webrtc.leaveRoom();
      this.webrtc.disconnect();
    } catch (e) {
      // console.log(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          <Context.Provider value={this.webrtc}>{this.props.children}</Context.Provider>
        }
      </React.Fragment>
    );
  }
}

LioWebRTC.propTypes = {
  options: PropTypes.object,
  onReady: PropTypes.func,
  onJoinedRoom: PropTypes.func,
  onChannelOpen: PropTypes.func,
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
  onPeerStreamAdded: PropTypes.func,
  onRemovedPeer: PropTypes.func,
  onConnectionError: PropTypes.func
};

LioWebRTC.defaultProps = {
  options: {
    dataOnly: true,
    debug: false
  }
};

export default LioWebRTC;
