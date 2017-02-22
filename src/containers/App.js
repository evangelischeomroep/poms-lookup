import React, { Component } from 'react'
import SearchForm from './SearchForm'
import Button from '../components/Button'
import SearchResults from '../components/SearchResults'
import ErrorMessage from '../components/ErrorMessage'
import LoadingIndicator from '../components/LoadingIndicator'
import api from '../api'
import { getFiltersFromUrl } from '../utils/urlHelpers'

import './App.css'

class App extends Component {
  state = {
    results: [],
    selection: [],
    isLoading: false,
    hasLoaded: false,
    error: undefined
  }

  onSearchFormSubmit = ({ text }) => {
    if (this.state.isLoading) {
      return
    }

    this.setState({
      isLoading: true
    })

    return api.media({ text, ...getFiltersFromUrl() })
      .then((results) => {
        this.setState({
          isLoading: false,
          hasLoaded: true,
          results: results
        })
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          hasLoaded: true,
          error: error
        })

        throw error
      })
  }

  onSearchResultClick = (item) => {
    const mid = item.mid
    const limit = this.props.selectionLimit

    // Remove from selection if it is already selected
    if (this.state.selection.find(s => s.mid === mid)) {
      this.setState({
        selection: this.state.selection.filter(s => s.mid !== mid)
      })
    // Add to selection if not already selected and selection limit is not reached yet
    } else if (!limit || (this.state.selection.length < limit)) {
      this.setState({
        selection: [...this.state.selection, item]
      })
    }
  }

  onChooseSelection = () => {
    if (window.opener) {
      window.opener.postMessage({ items: this.state.selection }, '*')
    }
  }

  renderLimitMessage = () => {
    const limit = this.props.selectionLimit

    if (limit && this.state.results.length) {
      return <p>Je kunt maximaal {limit} {limit === 1 ? 'item' : 'items'} selecteren</p>
    }

    return null
  }

  renderContent = () => {
    const {
      error,
      isLoading,
      hasLoaded,
      results,
      selection
    } = this.state

    if (error) {
      return <ErrorMessage message='Oeps, er is iets fout gegaan!' />
    }

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (hasLoaded && !results.length) {
      return <p>Geen resultaten gevonden. Probeer een andere zoekterm.</p>
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
          {this.renderLimitMessage()}
        </header>
        <div className='App-content'>
          {this.renderContent()}
        </div>
        <footer className='App-footer'>
          <p>
            {selection.length ? <Button onClick={this.onChooseSelection}>Kies {selection.length} {selection.length === 1 ? 'geselecteerd item' : 'geselecteerde items'}</Button> : ''}
          </p>
          <p>POMS Lookup | <a href='https://github.com/evangelischeomroep/poms-lookup' target='_blank'>GitHub</a></p>
        </footer>
      </div>
    )
  }
}

export default App
