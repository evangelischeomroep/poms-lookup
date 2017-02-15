/* eslint-env jest */

// Create a mock function for window.location.reload()
Object.defineProperty(window.location, 'reload', {
  value: jest.fn()
})

// Create a mock function for window.opener.postMessage()
Object.defineProperty(window, 'opener', {
  value: {
    postMessage: jest.fn()
  }
})
