import React, { Component } from 'react'
import SearchForm from './SearchForm'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>POMS Lookup</h1>
          <SearchForm />
        </header>
        <div className='App-content'>
          <p className='App-intro'>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <footer className='App-footer'>
          <p>POMS Lookup</p>
        </footer>
      </div>
    )
  }
}

export default App
