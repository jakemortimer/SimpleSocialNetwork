import Table from 'react-bootstrap/Table';
import NavCustom from './NavCustom';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function User({ token, displayName, setSearchTerm }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/user/`, {headers: {
      Authorization: `Token ${token}`}})
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error fetching user data:', error));
}, [token]);
  return (
     <div>
      <NavCustom token={token} username={displayName} setSearchTerm={setSearchTerm} />
      {users ?
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => {
              return (
                <tr>
                  <td><a href={`/user/${user.id}`}>{user.id}</a></td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table> : <header className="App-header"><h1>You are not logged in...</h1></header>
        }
    </div>
  );
}

export default User;