import React from 'react';
import './App.css';
import Title from './containers/title';
import Search from './components/search/search';
import List from './components/SongsList/SongsList'

function App() {
  return (
  <div className="App">
    <main style = {{'justifyContent':'center','background':'black'}}>
    <Title/>
    <Search/>
    <List />
    </main>
  </div>
  );
}

export default App;
