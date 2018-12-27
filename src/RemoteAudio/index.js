import React from 'react';
import PropTypes from 'prop-types';
import { withWebRTC } from '../LioWebRTCContext';

class RemoteAudio extends React.Component {
  componentDidMount() {
    this.props.webrtc.on('peerStreamAdded', (stream, peer) => {
      if (peer.id === this.props.peer.id) {
        this.props.webrtc.attachStream(stream, this.remoteVid);
      }
    });
  }

  render() {
    const { audioProps, webrtc } = this.props;
    return (
      <audio
        {...audioProps}
        id={webrtc.getDomId(this.props.peer)}
        ref={(vid) => { this.remoteVid = vid; }}
      />
    );
  }
}

RemoteAudio.propTypes = {
  audioProps: PropTypes.object,
  peer: PropTypes.any.isRequired
};

export default withWebRTC(RemoteAudio);
