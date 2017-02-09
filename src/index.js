import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-virtualized/styles.css'

const root = document.getElementById('root')

let render = () => {
  const App = require('./containers/App').default

  ReactDOM.render(
    <App />,
    root,
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default
    ReactDOM.render(
      <RedBox error={error} />,
      root,
    )
  }

  // In development, we wrap the rendering function to catch errors,
  // and if something breaks, log the error and render it to the screen
  render = () => {
    try {
      renderApp()
    } catch (error) {
      console.error(error)
      renderError(error)
    }
  }

  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('./containers/App', () => {
    setTimeout(render)
  })
}

render()
