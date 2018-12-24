import React from 'react';
import PropTypes from 'prop-types';
import { withWebRTC } from '../LioWebRTCContext';

class LocalAudio extends React.Component {
  componentDidMount() {
    this.props.webrtc.setLocalVideo(this.localAudio);
    this.props.webrtc.startLocalVideo();
  }

  render() {
    return (
      <vaudio
        {...this.props.videoProps}
        id='localAudio'
        ref={(vid) => { this.localAudio = vid; }}
      />
    );
  }
}

LocalAudio.propTypes = {
  audioProps: PropTypes.object
}

export default withWebRTC(LocalAudio);
