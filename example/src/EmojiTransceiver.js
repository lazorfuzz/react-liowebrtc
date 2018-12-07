import React from 'react';
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

  generateChats = () => {
    if(this.chatBox) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <b className="name" style={{ color: item.alert ? '#888' : '#333' }}>{item.name}</b> {!item.alert && <Twemoji style={{ fontSize: '64px' }} text={this.props.emojis[item.message].symbol} />}
      </div>
    ));
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
