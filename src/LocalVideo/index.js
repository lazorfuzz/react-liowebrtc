import React from 'react';
import PropTypes from 'prop-types';
import { withWebRTC } from '../LioWebRTCContext';

class LocalVideo extends React.Component {
  componentDidMount() {
    this.props.webrtc.setLocalVideo(this.localVid);
    this.props.webrtc.startLocalVideo();
  }

  render() {
    return (
      <video
        {...this.props.videoProps}
        id='localVideo'
        ref={(vid) => { this.localVid = vid; }}
      />
    );
  }
}

LocalVideo.propTypes = {
  videoProps: PropTypes.object
}

export default withWebRTC(LocalVideo);
