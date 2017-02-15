/* eslint-env jest */

import React from 'react'
import { mount, shallow } from 'enzyme'
import App from './App'
import api from '../api'

jest.mock('../utils/getFiltersFromUrl')
jest.mock('../api')

it('renders without crashing', () => {
  mount(<App />)
})

describe('Error state', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
    wrapper.setState({ error: new Error('ohnoes') })
  })

  it('renders an ErrorMessage', () => {
    expect(wrapper.find('ErrorMessage')).toHaveLength(1)
  })

  it("doesn't render SearchResults", () => {
    expect(wrapper.find('SearchResults')).toHaveLength(0)
  })
})

describe('Loading state', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
    wrapper.setState({ isLoading: true })
  })

  it('renders a LoadingIndicator', () => {
    expect(wrapper.find('LoadingIndicator')).toHaveLength(1)
  })

  it('disables the SearchForm', () => {
    const searchForm = wrapper.find('SearchForm')

    expect(searchForm.prop('disabled')).toEqual(true)
  })
})

describe('onSearchFormSubmit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('sets the isLoading state', () => {
    wrapper.instance().onSearchFormSubmit({ text: 'succeed' })
    expect(wrapper.state('isLoading')).toEqual(true)
  })

  it('unsets the isLoading state when the API call succeeds', () => {
    expect.assertions(2)

    return wrapper.instance().onSearchFormSubmit({ text: 'succeed' }).then(() => {
      expect(wrapper.state('results')).toHaveLength(4)
      expect(wrapper.state('isLoading')).toEqual(false)
    })
  })

  it('sets the error state if the API call fails', () => {
    expect.assertions(2)

    return wrapper.instance().onSearchFormSubmit({ text: 'fail' }).catch((error) => {
      expect(error.message).toEqual('Something went wrong')
      expect(wrapper.state('error')).toEqual(error)
    })
  })

  it('unsets the isLoading state if the API call fails', () => {
    expect.assertions(2)

    return wrapper.instance().onSearchFormSubmit({ text: 'fail' }).catch((error) => {
      expect(error.message).toEqual('Something went wrong')
      expect(wrapper.state('isLoading')).toEqual(false)
    })
  })

  it('only makes a single API call simultaneously', () => {
    api.media = jest.fn(() => Promise.resolve([]))

    wrapper.instance().onSearchFormSubmit({ text: 'test' })
    wrapper.instance().onSearchFormSubmit({ text: 'test 2' })

    expect(api.media).toHaveBeenCalledTimes(1)
  })
})

describe('onChooseSelection', () => {
  it('posts a message to the opener', () => {
    const wrapper = shallow(<App />)
    const mids = ['POMS_EO_7337515', 'POMS_EO_7167107', 'POMS_EO_7001692', 'POMS_EO_5284895']

    wrapper.setState({ selection: mids })
    wrapper.instance().onChooseSelection()

    expect(window.opener.postMessage).toHaveBeenCalledWith({ mids: mids }, '*')
  })
})
