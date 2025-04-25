import React from 'react'

const form = () => {
  return (
    <>
      <div>
        <h1>Payment Form</h1>
        <div className='w-full'>
            <form>
                <div className='w-full'>
                    <label>Full Name:</label>
                    <input 
                        type='text'
                        placeholder='Your full name'
                    />
                </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default form