import NavCustom from './NavCustom'

function Logout({ setToken, setDisplayName, setSearchTerm }) {
    setToken('')
    setDisplayName('')
    localStorage.setItem('token', '')
    localStorage.setItem('displayName', '');
    localStorage.setItem('ID', '');
    return (
        <div>
        <NavCustom token={null} setSearchTerm={setSearchTerm} />
        <header className="App-header">
            <h1>You have logged out successfully...</h1>
        </header>
      </div>
    )
}

export default Logout;