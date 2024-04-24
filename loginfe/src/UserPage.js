import NavCustom from './NavCustom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './App.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserPage({ token, displayName, setSearchTerm }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(false)
  const [posts, setPosts] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = async () => {
    try {
        const response = await axios.post('http://localhost:8000/create_post/', {
            "user": id,
            text
        },  {headers: {
            Authorization: `Token ${token}`}});
        console.log(response.data)
        setText('');
        navigate("/post")
    } catch (error) {
        console.error('Error login for user:', error);
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/user/${id}`, {headers: {
      Authorization: `Token ${token}`}})
        .then(response => setUser(response.data[0]))
        .catch(error => console.error('Error fetching user data:', error));
    }, [token, id]);

    useEffect(() => {
        axios.get(`http://localhost:8000/user_post/${id}`, {headers: {
          Authorization: `Token ${token}`}})
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching user data:', error));
        }, [token, id]);

    useEffect(() => {
        axios.post(`http://localhost:8000/token_check/`, {
            token
        }, {headers: {
          Authorization: `Token ${token}`}})
            .then(response => {
                setIsValid(response.data[0].user === Number(id))
            })
            .catch(error => console.error('Error fetching user data:', error));
        }, [token, id]);

    console.log(posts)
  return (
     <div>
      <NavCustom token={token} username={displayName} setSearchTerm={setSearchTerm} />
      {user ?
        <><div className="card-center">
            <Card>
            <Card.Header><h1>{user.username}</h1></Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                    {' '}
                    <h3><b>ID:</b> {user.id}</h3>
                    <h3><b>Email address:</b> {user.email}</h3>{' '}
                </p>
                </blockquote>
            </Card.Body>
            </Card>
        </div>
        {isValid && <Form className="form-center-bigger" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <h1>Post something...</h1>
                    <Form.Control type="textarea" as="textarea" maxlength="256" placeholder="Write here..." value={text} onChange={handleTextChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>}
            <div className='post-center'>
            <h1>{user.username}'s posts</h1>
            <hr />
            {posts.length > 0 ?
            posts.map(
                (post) => {
                console.log(post)
                return (
                    <div>
                    <div className='position-relative muted-grey'>
                        <div className="position-absolute top-0 end-0">{post.created}</div>
                    </div>
                    <h2>@{post.username}</h2>
                    <p>{post.text}</p>
                    <hr></hr>
                    </div>
                )
                }
            ) : <header className="App-header"><h5>No posts here...</h5></header>
                }
            </div>
        </> : <header className="App-header"><h1>You are not logged in...</h1></header>
        }
    </div>
  );
}

export default UserPage;