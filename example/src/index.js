import React from 'react';
import { render } from "react-dom";
import { LioWebRTC } from "react-liowebrtc";
import EmojiTransceiver from './EmojiTransceiver';
import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
  }

  handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'emoji':
        this.addChat(`Peer-${peer.id.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  }

  addChat = (name, message, alert = false) => {
    if (message) this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <div className="infoBox">
            <h1>React LioWebRTC</h1>
            <p className="bodyText">A (work in progress) component library that enables real-time, bidirectional peer to peer communication via WebRTC. Compatible with Electron.</p>
          </div>
        </div>
        <LioWebRTC
          options={this.state.options}
          onReady={(webrtc) => webrtc.joinRoom('react-liowebrtc-test-demo')}
          onCreatedPeer={this.handleCreatedPeer}
          onReceivedPeerData={this.handlePeerData}
        >
          <EmojiTransceiver chatLog={this.state.chatLog} onSend={(emoji) => emoji && this.addChat('Me', emoji)} />
        </LioWebRTC>
        <div className="installBox">
          <h1>Installation</h1>
          <code className="install">npm i react-liowebrtc</code>
        </div>
      </div>
    );
  }

}

render(<App />, document.getElementById("root"));
