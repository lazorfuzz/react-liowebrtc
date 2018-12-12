import React from 'react';
import PropTypes from 'prop-types';
import { withWebRTC } from '../LioWebRTCContext';

class RemoteVideo extends React.Component {
  componentDidMount() {
    this.props.webrtc.on('peerStreamAdded', (stream, peer) => {
      if (peer.id === this.props.peer.id) {
        this.props.webrtc.attachStream(stream, this.remoteVid);
      }
    });
  }

  render() {
    return (
      <video
        {...this.props.videoProps}
        id={this.props.webrtc.getDomId(this.props.peer)}
        ref={(vid) => { this.remoteVid = vid; }}
      />
    );
  }
}

RemoteVideo.propTypes = {
  videoProps: PropTypes.object,
  peer: PropTypes.any.isRequired
};

export default withWebRTC(RemoteVideo);
