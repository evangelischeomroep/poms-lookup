import React, { Component } from 'react'
import SearchForm from './SearchForm'
import SearchResults from '../components/SearchResults'

import './App.css'

const MOCK_RESULTS = [
  { mid: 'POMS_EO_7337515', title: 'Vlog: prinses Beatrix bezoekt Madurodam', date: 1486577234482, type: 'CLIP' },
  { mid: 'POMS_EO_7167107', title: 'Vlog: Achter de schermen bij de opening van Thialf', date: 1485589331114, type: 'CLIP' },
  { mid: 'POMS_EO_7001692', title: 'Vlog Joël Voordewind uit Israël', date: 1484749688641, type: 'CLIP' },
  { mid: 'POMS_EO_5284895', title: 'Zapp Your Planet Vlog - Rondleiding kamp', date: 1475146440000, type: 'CLIP' }
]

class App extends Component {
  state = {
    results: MOCK_RESULTS
  }

  render () {
    const { results } = this.state

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>POMS Lookup</h1>
          <SearchForm />
        </header>
        <div className='App-content'>
          {results.length && <SearchResults results={results} />}
        </div>
        <footer className='App-footer'>
          <p>POMS Lookup</p>
        </footer>
      </div>
    )
  }
}

export default App
