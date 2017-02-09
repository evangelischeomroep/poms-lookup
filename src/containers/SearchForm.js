import React, { Component } from 'react'
import Button from '../components/Button'

class SearchForm extends Component {
  state = {
    text: ''
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  onFormSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
    // TODO: Do something :)
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <label htmlFor='text'>Zoekterm</label>
          <input id='text' type='text' value={this.state.text} onChange={this.onTextChange} />
          <Button type='submit'>Zoeken</Button>
        </div>
      </form>
    )
  }
}

export default SearchForm
