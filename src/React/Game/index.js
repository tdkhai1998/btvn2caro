import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Board from '../Board';
import Controls from '../Controls';
import SideBar from '../SideBar';
import NavBar from '../NavBar';
import Popup from '../Popup';
import RequestPopup from '../RequestPopup';

import { ChangeModeGame } from '../../Redux-thunk';
import { UpdateGameMode, TypeGameMode } from '../../Redux';

class GameOffline extends React.Component {
  componentDidMount() {
    const { ChangeMode, gameMode } = this.props;
    ChangeMode(gameMode.mode);
  }

  render() {
    const { user } = this.props;
    if (!user) return <Redirect to="/login" />;
    return (
      <div>
        <NavBar selected="game" />
        <Popup />
        <RequestPopup />
        <Container style={{ marginTop: 20 }}>
          <Row>
            <Col md="auto">
              <Board />
            </Col>
            <Col md="auto" style={{ background: 'gray' }}>
              <Controls />
              <SideBar />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  gameMode: state.gameMode,
  user: state.user
});
const mapDispatchToProps = dis => ({
  ChangeMode: mode => {
    if (mode !== TypeGameMode.modeType.Offline) {
      dis(
        UpdateGameMode({ mode: TypeGameMode.modeType.Offline, yourTurn: false })
      );
      dis(ChangeModeGame());
    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOffline);
