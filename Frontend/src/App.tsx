import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((posts) => console.log(posts))
    .catch((error) => console.error(error));

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Check console!</p>
      </header>
    </div>
  );
}

export default App;
