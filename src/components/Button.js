import React from 'react'

import './Button.css'

const Button = ({ children, ...other }) => (
  <button className='Button' {...other}>{children}</button>
)

export default Button
