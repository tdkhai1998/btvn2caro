import React from 'react';
import { Table, Button } from 'react-bootstrap';
import NavBar from './Nav';

export default function Home(props) {
  const { Name } = props;
  return (
    <div>
      <NavBar />
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
              <Button style={{ margin: '0 auto' }}>LOGOUT</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
