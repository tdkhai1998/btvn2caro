import React from 'react';
import { connect } from 'react-redux';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { sendChatMess } from '../../Redux-thunk';

const Chat = props => {
  const { sendMess, chat } = props;
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={mess => sendMess(mess)}
        profileAvatar={chat.profileAvatar}
        subtitle={chat.name}
        badge="1"
      />
    </div>
  );
};
const mapStateToProps = state => ({
  chat: state.chat
});

const mapDispatchToProps = dispatch => ({
  sendMess: mess => dispatch(sendChatMess(mess))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
