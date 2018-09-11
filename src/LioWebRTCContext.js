import React from 'react';

const Context = React.createContext();

export function withWebRTC(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {webrtc => (<Component {...props} webrtc={webrtc} />)}
      </Context.Consumer>
    );
  }
}

export default Context;
