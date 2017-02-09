import React from 'react'
import classnames from 'classnames'

import './Button.css'

const Button = ({ children, className, ...props }) => {
  const classes = classnames({
    Button: true
  }, className)

  return (
    <button className={classes}>{children}</button>
  )
}

export default Button
