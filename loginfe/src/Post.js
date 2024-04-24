import NavCustom from './NavCustom';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Post({ token, displayName, setSearchTerm }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/post/`, {headers: {
      Authorization: `Token ${token}`}})
    .then(response => setPosts(response.data))
    .catch(error => console.error('Error fetching user data:', error));
}, [token]);
  return (
    <>
    <NavCustom token={token} username={displayName} setSearchTerm={setSearchTerm} />
     <div className='post-center'>
      
      {posts ?
      posts.map(
        (post) => {
          console.log(post)
          return (
            <div>
              <div className='position-relative muted-grey'>
                <div className="position-absolute top-0 end-0">{post.created}</div>
              </div>
              <h1>@{post.username}</h1>
              <p>{post.text}</p>
              <hr></hr>
            </div>
          )
        }
      ) : <header className="App-header"><h1>You are not logged in...</h1></header>
        }
    </div>
    </>
  );
}

export default Post;