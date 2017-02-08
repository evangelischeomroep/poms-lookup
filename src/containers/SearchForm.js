import React, { Component } from 'react'

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
          <button type='submit'>Zoeken</button>
        </div>
      </form>
    )
  }
}

export default SearchForm
