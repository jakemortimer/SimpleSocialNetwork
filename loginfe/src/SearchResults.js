import Table from 'react-bootstrap/Table';
import NavCustom from './NavCustom';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchResults({ token, displayName, searchTerm, setSearchTerm }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    try {
        const response = axios.post(`http://localhost:8000/search/`, {
            username: searchTerm,
        }, {headers: {
            Authorization: `Token ${token}`}}).then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching user data:', error));
        
    } catch (error) {
        console.error('Error login for user:', error);
    }
}, [token, searchTerm]);
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
      </Table> : <header className="App-header"><h1>No users found...</h1></header>
        }
    </div>
  );
}

export default SearchResults;