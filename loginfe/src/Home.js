import NavCustom from './NavCustom'

function Home({ token, displayName, setSearchTerm }) {
    return (
        <div>
        <NavCustom token={token} username={displayName} setSearchTerm={setSearchTerm} />
        <header className="App-header">
            <h1>Welcome to my login example!</h1>
        </header>
      </div>
    )
}

export default Home;