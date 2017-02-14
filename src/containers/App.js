import React, { Component } from 'react'
import SearchForm from './SearchForm'
import Button from '../components/Button'
import SearchResults from '../components/SearchResults'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'

import './App.css'

const MOCK_RESULTS = [
  { mid: 'POMS_EO_7337515', title: 'Vlog: prinses Beatrix bezoekt Madurodam', date: 1486577234482, type: 'CLIP' },
  { mid: 'POMS_EO_7167107', title: 'Vlog: Achter de schermen bij de opening van Thialf', date: 1485589331114, type: 'CLIP' },
  { mid: 'POMS_EO_7001692', title: 'Vlog Joël Voordewind uit Israël', date: 1484749688641, type: 'CLIP' },
  { mid: 'POMS_EO_5284895', title: 'Zapp Your Planet Vlog - Rondleiding kamp', date: 1475146440000, type: 'CLIP' }
]

class App extends Component {
  state = {
    results: [],
    selection: [],
    isLoading: false,
    error: undefined
  }

  onSearchFormSubmit = ({ text }) => {
    this.setState({
      isLoading: true
    })

    window.setTimeout(() => {
      this.setState({
        isLoading: false,
        results: MOCK_RESULTS
      })
    }, 3000)
  }

  onSearchResultClick = ({ mid }) => {
    // Remove from selection if it is already selected
    if (this.state.selection.indexOf(mid) > -1) {
      this.setState({
        selection: this.state.selection.filter(item => item !== mid)
      })
    // Add to selection if not already selected
    } else {
      this.setState({
        selection: [...this.state.selection, mid]
      })
    }
  }

  onChooseSelection = () => {
    if (window.opener) {
      window.opener.postMessage({ mids: this.state.selection }, '*')
    }
  }

  renderContent = () => {
    const {
      error,
      isLoading,
      results,
      selection
    } = this.state

    if (error) {
      return <ErrorMessage message='Oeps, er is iets fout gegaan!' />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    return results.length ? (
      <SearchResults
        results={results}
        selection={selection}
        onSearchResultClick={this.onSearchResultClick}
      />
    ) : null
  }

  render () {
    const { selection, isLoading } = this.state

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>POMS Lookup</h1>
          <SearchForm disabled={isLoading} onSubmit={this.onSearchFormSubmit} />
        </header>
        <div className='App-content'>
          {this.renderContent()}
        </div>
        <footer className='App-footer'>
          <p>
            {selection.length ? <Button onClick={this.onChooseSelection}>Kies {selection.length} {selection.length === 1 ? 'geselecteerd item' : 'geselecteerde items'}</Button> : ''}
          </p>
          <p>POMS Lookup</p>
        </footer>
      </div>
    )
  }
}

export default App
