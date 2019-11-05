import React from "react";
import { connect } from "react-redux";
import { Container, Row, Button, Modal, Image, Col } from "react-bootstrap";
import * as action from "../../Redux";
import TypeGameMode from "../../Redux/GameMode/type";
import { serveSocket, ChangeModeGame } from "../../Redux-thunk";
import NavBar from "../NavBar";
import Popup from "../Popup";
import RequestPopup from "../RequestPopup";
import Chat from "../Chat";
import Board from "../Board";
import Controls from "../Controls";
import SideBar from "../SideBar";

const modeGame = action.TypeGameMode.modeType;

class GameOnline extends React.Component {
  constructor(props) {
    super();
    const { doing, done, found, updateMode, exit, find } = props;
    this.methods = { doing, done, found, updateMode, exit, find };
    this.socket = null;
  }

  componentWillMount() {
    this.methods.exit();
  }

  componentDidMount() {}

  Find() {
    this.methods.find();
  }

  render() {
    const { isFetching, gameMode } = this.props;
    if (gameMode.mode === modeGame.Offline)
      return (
        <div>
          <NavBar />
          <Modal show={isFetching} style={{ margin: "auto" }}>
            <Modal.Body>
              <Image
                src="loading.gif"
                style={{ width: "auto", height: "auto", paddingLeft: 138 }}
              />
            </Modal.Body>
          </Modal>
          <Container style={{ marginTop: 20 }}>
            <Row>
              <Button
                onClick={() => this.Find()}
                style={{ margin: "0 auto", marginTop: 250 }}
              >
                Tìm Bạn
              </Button>
            </Row>
          </Container>
        </div>
      );

    return (
      <div>
        <RequestPopup />
        <Chat />
        <Modal show={isFetching} style={{ margin: "auto" }}>
          <Modal.Body>
            <Image
              src="loading.gif"
              style={{ width: "auto", height: "auto", paddingLeft: 138 }}
            />
          </Modal.Body>
        </Modal>

        <NavBar />
        <Popup />
        <Container style={{ marginTop: 20 }}>
          <Row>
            <Col md="auto">
              <Board />
            </Col>
            <Col md="auto" style={{ background: "gray" }}>
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
  message: state.message,
  isFetching: state.isFetching,
  gameMode: state.gameMode
});

const mapDispatchToProps = dispatch => ({
  doing: () => dispatch(action.FetchDoing()),
  done: () => dispatch(action.FetchDone()),
  exit: () => {
    dispatch(action.ResetGameMode());
    dispatch(action.ResetBoard());
    dispatch(action.SetTurn(false));
    dispatch(action.RemoveWinnerLine());
    dispatch(action.ReSetHistory());
  },
  find: () => {
    dispatch(serveSocket());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOnline);
