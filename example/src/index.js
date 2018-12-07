import React from 'react';
import { render } from "react-dom";
import { LioWebRTC } from "react-liowebrtc";
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { solarizedlight } from 'react-syntax-highlighter/styles/prism';
import EmojiTransceiver from './EmojiTransceiver';
import c1 from './audio/c1.mp3';
import d1 from './audio/d1.mp3';
import e1 from './audio/e1.mp3';
import f1 from './audio/f1.mp3';
import g1 from './audio/g1.mp3';
import './index.css';

const codeString = `import React from 'react';
import { Twemoji } from 'react-emoji-render';
import { withWebRTC } from 'react-liowebrtc';
import './EmojiTransceiver.css';

class EmojiTransceiver extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      containerClass: 'container'
    };
  }

  handleShut = () => {
    this.setState({ containerClass: 'container animated hinge' });
    this.props.webrtc.leaveRoom();
    this.props.webrtc.disconnect();
  }

  handleSend = (emoji) => {
    this.props.webrtc.shout('emoji', emoji);
    this.props.onSend(emoji);
  }

  render() {
    const { emojis } = this.props;
    return (
      <div className={this.state.containerClass}>
        <div className="chatHeader">
          <button className="circleButton" onClick={this.handleShut}><p className="x">x</p></button>
          <h1 className="title">P2P Emoji Communicator</h1>
          <hr />
        </div>
        <div className="chatBox" ref={(div) => this.chatBox = div}>
          {this.props.chatLog.length ? this.generateChats() : (
            <div className="info">
              <p>To test this component out, open this page in a new tab or send it to a friend.</p>
            </div>
          )}
        </div>
        <hr />
        <div className="emojiBar">
          <div className="emojiButton" onClick={() => this.handleSend('heart')}><Twemoji text={emojis.heart.symbol} /></div>
          <div className="emojiButton" onClick={() => this.handleSend('laughing')}><Twemoji text={emojis.laughing.symbol} /></div>
          <div className="emojiButton" onClick={() => this.handleSend('barf')}><Twemoji text={emojis.barf.symbol} /></div>
          <div className="emojiButton" onClick={() => this.handleSend('tongue')}><Twemoji text={emojis.tongue.symbol} /></div>
          <div className="emojiButton" onClick={() => this.handleSend('poop')}><Twemoji text={emojis.poop.symbol} /></div>
        </div>
      </div>
    );
  }
}

export default withWebRTC(EmojiTransceiver);
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      options: {
        debug: true,
        dataOnly: true
      },
      viewSource: false,
      emojis: {
        heart: { symbol: '❤️', sound: c1},
        laughing: { symbol: '😂', sound: d1 },
        barf: { symbol: '🤮', sound: e1 },
        tongue: {symbol: '😛', sound: f1 },
        poop: {symbol: '💩', sound: g1 }
      }
    };
  }

  join = (webrtc) => {
    webrtc.joinRoom('react-liowebrtc-test-demo');
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

  handleViewSource = () => this.setState({ viewSource: !this.state.viewSource });

  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
    if (!alert) new Audio(this.state.emojis[message].sound).play();
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <div className="infoBox">
            <h1>React LioWebRTC</h1>
            <p className="bodyText">A (work in progress) component library that enables real-time, bidirectional peer to peer communication via WebRTC, and is compatible with Electron. <a href="https://github.com/lazorfuzz/react-liowebrtc">Click here</a> to view react-liowebrtc on GitHub.</p>
          </div>
        </div>
        <div className="installBox">
          <h1>Installation</h1>
          <code className="install">npm i react-liowebrtc</code>
        </div>
        <h1 style={{ textAlign: 'center' }}>Demo</h1>
        {
          !this.state.viewSource &&
          <LioWebRTC
            options={this.state.options}
            onReady={this.join}
            onCreatedPeer={this.handleCreatedPeer}
            onReceivedPeerData={this.handlePeerData}
          >
            <EmojiTransceiver
              className={this.state.transceiverClass}
              chatLog={this.state.chatLog}
              onSend={(emoji) => emoji && this.addChat('Me', emoji)}
              emojis={this.state.emojis}
            />
          </LioWebRTC>
        }
        {
          this.state.viewSource &&
          <div className="source animted zoomIn">
            <SyntaxHighlighter language='javascript' style={solarizedlight}>{codeString}</SyntaxHighlighter>
          </div>
        }
        <div className="viewSource">
          <span className="link" onClick={this.handleViewSource}>{this.state.viewSource ? 'View Demo' : 'View Source'}</span>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
