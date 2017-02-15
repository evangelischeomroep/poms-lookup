/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import SearchForm from './SearchForm'

it('renders without crashing', () => {
  shallow(<SearchForm />)
})

it('calls onSubmit with the entered text', () => {
  const onSubmit = jest.fn()
  const wrapper = shallow(<SearchForm onSubmit={onSubmit} />)
  const query = { text: 'test' }

  wrapper.setState(query)
  wrapper.simulate('submit', { preventDefault: () => {} })
  expect(onSubmit).toHaveBeenCalledWith(query)
})
