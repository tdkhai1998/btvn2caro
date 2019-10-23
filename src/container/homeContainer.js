import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import NAV from '../Components/Nav';

import { logout } from '../actions/allActions';

const Home = props => {
  const { Name, logout2, history, user } = props;
  console.log(user);
  return (
    <div>
      {!user ? history.push('/login') : ''}
      <NAV />
      <Table
        bordered
        hover
        style={{
          background: 'gray',
          margin: '0 auto',
          marginTop: 150,
          width: 150
        }}
      >
        <tbody>
          <tr>
            <td rowSpan="2">
              <img alt="" src="avt.png" style={{ height: 150, width: 150 }} />
            </td>
            <td>Name: {Name}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}>
              <Button
                style={{ margin: '0 auto' }}
                onClick={() => logout2(history)}
              >
                LOGOUT
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => ({
  logout2: his => dispatch(logout(his))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
