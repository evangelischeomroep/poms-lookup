/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from './ErrorMessage'

it('renders without crashing', () => {
  shallow(<ErrorMessage />)
})

it('renders the message', () => {
  const message = 'This is the message'
  const wrapper = shallow(<ErrorMessage message={message} />)

  expect(wrapper.contains(message)).toEqual(true)
})

it('reloads the window when the link is clicked', () => {
  const wrapper = shallow(<ErrorMessage />)

  wrapper.find('a').simulate('click', { preventDefault: () => {} })
  expect(window.location.reload).toHaveBeenCalled()
})
