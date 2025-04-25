import React from 'react'

const PaymentForm = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center justify-center'>
        <form className='w-full flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-2xl font-bold mb-4 '>Payment Form</h1>
            <div className='w-full flex items-center justify-center'>
              <label htmlFor="name">Full Name</label>
              <input type="text" placeholder='Full Name' />
            </div>
            <div className='w-full flex items-center justify-center'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Email' />
            </div>
            <div className='w-full flex items-center justify-center'>
              <button type="submit" >Login</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default PaymentForm