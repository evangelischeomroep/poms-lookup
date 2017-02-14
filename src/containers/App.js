import React, { Component } from 'react'
import SearchForm from './SearchForm'
import Button from '../components/Button'
import SearchResults from '../components/SearchResults'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import api from '../api'

import './App.css'

class App extends Component {
  state = {
    results: [],
    selection: [],
    isLoading: false,
    error: undefined
  }

  onSearchFormSubmit = ({ text }) => {
    if (this.state.isLoading) {
      return
    }

    this.setState({
      isLoading: true
    })

    api.media({ text })
      .then((results) => {
        this.setState({
          isLoading: false,
          results: results
        })
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
          error: error
        })
      })
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
