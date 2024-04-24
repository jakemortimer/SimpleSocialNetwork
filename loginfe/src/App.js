import Home from './Home';
import User from './User';
import UserPage from './UserPage';
import Post from './Post';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import SearchResults from './SearchResults';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [displayName, setDisplayName] = useState(localStorage.getItem('displayName'));
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm'));
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home token={token} displayName={displayName} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "user",
      element: <User token={token} displayName={displayName} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "user/:id",
      element: <UserPage token={token} displayName={displayName} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "post",
      element: <Post token={token} displayName={displayName} setSearchTerm={setSearchTerm} />
    },
    {
      path: "login",
      element: <Login token={token} setToken={setToken} displayName={displayName} setDisplayName={setDisplayName} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "register",
      element: <Register token={token} setToken={setToken} displayName={displayName} setDisplayName={setDisplayName} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "search_results",
      element: <SearchResults token={token} displayName={displayName} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />,
    },
    {
      path: "logout",
      element: <Logout setToken={setToken} setDisplayName={setDisplayName} setSearchTerm={setSearchTerm} />,
    },
  ]);
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
