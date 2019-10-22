import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default function LoginForm(props) {
  const { Name } = props;
  return (
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
  );
}
