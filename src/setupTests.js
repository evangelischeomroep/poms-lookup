/* eslint-env jest */

// Create a mock function for window.location.reload()
Object.defineProperty(window.location, 'reload', {
  value: jest.fn()
})
