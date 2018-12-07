import React from 'react';
import { withWebRTC } from '../LioWebRTCContext';

class LocalVideo extends React.Component {
  componentDidMount() {
    this.props.webrtc.setLocalVideo(this.localVid);
  }

  render() {
    return (
      <div>
        <video
          id='localVideo'
          ref={(vid) => { this.localVid = vid; }}
        />
      </div>
    );
  }
}

export default withWebRTC(LocalVideo);
