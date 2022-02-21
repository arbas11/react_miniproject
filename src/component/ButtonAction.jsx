import React from 'react'

function ButtonAction({ what, todo, toChange }) {
  return (
    <button
      className={`btn-action-${what}`}
      onClick={() => todo(toChange)}>{what}</button>
  )
}
export default ButtonAction