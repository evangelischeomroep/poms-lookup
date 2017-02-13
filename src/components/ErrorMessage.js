import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  const onLinkClick = (event) => {
    event.preventDefault()
    window.location.reload()
  }

  return (
    <div className='ErrorMessage'>
      <p>{message}</p>
      <p>Probeer het opnieuw of <a className='ErrorMessage-link' href='#' onClick={onLinkClick}>herlaad de pagina</a></p>
    </div>
  )
}

export default ErrorMessage
