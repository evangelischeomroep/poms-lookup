import React from 'react'
import classnames from 'classnames'

import './Button.css'

const Button = ({ children, className, ...other }) => {
  const classes = classnames({
    Button: true
  }, className)

  return (
    <button className={classes} {...other}>{children}</button>
  )
}

export default Button
