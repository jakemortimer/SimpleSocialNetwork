import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import './App.css'

function NavCustom({ token, username, setSearchTerm }){
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const protocol = url[0];
    const host = url[2];
    const baseurl = protocol + '//' + host;

    const handleIDChange = (event) => {
        setSearchTerm(event.target.value)
        localStorage.setItem('searchTerm', event.target.value)
    }

    const handleSubmit = () => {
        navigate('/search_results')
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href={`${baseurl}/`}>LoginFE</Navbar.Brand>
            <Nav className="me-auto">
                {token && 
                <>
                <Nav.Link href={`${baseurl}/user`}>Users</Nav.Link>
                <Nav.Link href={`${baseurl}/post`}>Posts</Nav.Link>
                </>
                }
                {!token ? 
                    <>
                        <Nav.Link href={`${baseurl}/login`}>Login</Nav.Link>
                        <Nav.Link href={`${baseurl}/register`}>Register</Nav.Link>
                    </> :
                    <Nav.Link href={`${baseurl}/logout`}>Logout</Nav.Link>
                }
            </Nav>

            {token && <><Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href={`${baseurl}/user/${localStorage.getItem('ID')}`}>{username}</a>
            </Navbar.Text>
            </Navbar.Collapse>
            <Navbar.Collapse className='space-left'>
            <Form onSubmit={handleSubmit}>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Username"
                    className=" mr-sm-2"
                    onChange={handleIDChange}
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit">Search</Button>
                </Col>
                </Row>
            </Form>    
            </Navbar.Collapse></>}
            </Container>
        </Navbar>
    );
}

export default NavCustom;