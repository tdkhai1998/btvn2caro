import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../Redux-thunk';
import NavBar from '../NavBar';
import Popup from '../Popup';

const Home = props => {
  const { logout2, history, user, isFetching, infoUser } = props;
  const style = {
    background: 'gray',
    margin: '0 auto',
    marginTop: 150,
    width: 150
  };

  if (user)
    return (
      <div>
        <Popup />
        <NavBar />
        <Table bordered hover style={style}>
          <tbody>
            <tr>
              <td rowSpan="2">
                <img
                  alt=""
                  src={infoUser.avatar && 'avt.png'}
                  style={{ height: 150, width: 150 }}
                />
              </td>
              <td>Name: {user && user.user && user.user.username}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}>
                <Button
                  style={{ margin: '0 auto' }}
                  onClick={() => logout2(history)}
                  disabled={isFetching}
                >
                  {isFetching && <Spinner animation="border" />} LOGOUT
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  return <Redirect to="/login" />;
};

const mapStateToProps = state => {
  return {
    infoUser: state.infoUser,
    user: state.user,
    isFetching: state.isFetching
  };
};
const mapDispatchToProps = dispatch => ({
  logout2: his => dispatch(logout(his))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
