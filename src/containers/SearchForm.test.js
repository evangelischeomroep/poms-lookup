/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import SearchForm from './SearchForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SearchForm />, div)
})
