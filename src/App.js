import './App.css';
import Dictionary from './Dictionary'

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <a href="/" className="btn btn-primary">Hello</a>
        </header>
        <main>
          <Dictionary />
        </main>
        <footer className="App-footer"><small>Coded by Natalia Pokusa</small></footer>
      </div>
    </div>
  );
}

export default App;
