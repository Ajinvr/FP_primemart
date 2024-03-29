import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
function Loader() {
  return (
  <Spinner className="custom-spinner" animation="border"  role="status">
    <span  className="visually-hidden ls">Loading...</span>
  </Spinner>
  )
}

export default Loader