import React from 'react'

function ButtonAction({ what, todo, doit }) {
  return (
    <button
      className={`btn-action-${what}`}
      onClick={() => todo(doit)}>{what}</button>
  )
}
export default ButtonAction