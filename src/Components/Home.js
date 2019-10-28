import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NavBar from './Nav';

export default function Home(props) {
  const { logout2, history, user } = props;
  const style = {
    background: 'gray',
    margin: '0 auto',
    marginTop: 150,
    width: 150
  };
  if (user)
    return (
      <div>
        <NavBar />
        <Table bordered hover style={style}>
          <tbody>
            <tr>
              <td rowSpan="2">
                <img alt="" src="avt.png" style={{ height: 150, width: 150 }} />
              </td>
              <td>Name: {user && user.user && user.user.username}</td>
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
  return <Redirect to="/login" />;
}
