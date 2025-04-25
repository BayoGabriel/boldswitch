import React from 'react'

const PaymentForm = () => {
  return (
    <>
      <div className='w-full flex items-center justify-center'>
        <form className='w-full max-w-md'>
          <div className='w-full flex items-center justify-center'>
            <h1>Payment Form</h1>
            <div className='w-full flex items-center justify-center'>
              <label htmlFor="name">Full Name</label>
              <input type="text" placeholder='Full Name' />
            </div>
            <div className='w-full flex items-center justify-center'>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='Email' />
            </div>
            
          </div>
        </form>
      </div>
    </>
  )
}

export default PaymentForm