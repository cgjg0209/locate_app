import React from 'react'

const SecButton = () => {
  return (
    <div className='mt-12 text-center'>
        <button onClick={()=>window.location.reload()} className="bg-green-400 hover:bg-green-300 text-white rounded px-4 py-2 shadow-xl">reload</button>
    </div>
  )
}

export default SecButton