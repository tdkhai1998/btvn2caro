import React from 'react';
import { connect } from 'react-redux';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { sendChatMess } from '../../Redux-thunk';

const Chat = props => {
  const { sendMess, chat } = props;
  console.log('chatcht', chat);
  //   if (chat.newMessage) addResponseMessage(chat.newMessage);
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={mess => sendMess(mess)}
        profileAvatar={chat.profileAvatar}
        title="My new awesome title"
        subtitle="And my cool subtitle"
        badge="5"
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
