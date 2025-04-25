"use client"

import { useState, useEffect } from "react"

const PaymentForm = () => {
  // Form states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  // Validation states
  const [cardNumberValid, setCardNumberValid] = useState(false)
  const [expiryDateValid, setExpiryDateValid] = useState(false)
  const [cvvValid, setCvvValid] = useState(false)

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("userPaymentDetails")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)
      setIsLoggedIn(true)
    }
  }, [])

  // Validate card number (16 digits only)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 16) {
      setCardNumber(value)
      setCardNumberValid(value.length === 16)
    }
  }

  // Validate expiry date (MM/YY format)
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 0) {
      // Format as MM/YY
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4)
      }

      // Validate month is between 01-12
      const month = Number.parseInt(value.slice(0, 2))
      const isValidMonth = month >= 1 && month <= 12

      // Validate year is current or future
      let isValidYear = false
      if (value.length > 3) {
        const year = Number.parseInt("20" + value.slice(3, 5))
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1

        isValidYear = year > currentYear || (year === currentYear && month >= currentMonth)
      }

      setExpiryDateValid(isValidMonth && isValidYear && value.length === 6)
    }

    setExpiryDate(value.length > 2 ? value.slice(0, 2) + "/" + value.slice(2, 4) : value)
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
      setCvvValid(value.length >= 3 && value.length <= 4)
    }
  }
 
  const isFormValid = () => {
    return fullName && email && cardNumberValid && expiryDateValid && cvvValid
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      const userData = { fullName, email }
      localStorage.setItem("userPaymentDetails", JSON.stringify(userData))

      alert("Payment successful!")

      
      setUserData(userData)
      setIsLoggedIn(true)
    } else {
      alert("Please fill all fields correctly")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userPaymentDetails")
    setIsLoggedIn(false)
    setUserData(null)

    setFullName("")
    setEmail("")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")

    setCardNumberValid(false)
    setExpiryDateValid(false)
    setCvvValid(false)
  }

  if (isLoggedIn && userData) {
    return (
      <>
        <div className="w-full flex flex-col items-center min-h-screen justify-center bg-red-300 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome, {userData.fullName}!</h1>

            <div className="mb-6 p-4 bg-gray-50 rounded border">
              <p className="mb-2">
                <span className="text-[25px] font-bold mb-2">Full Name:</span> {userData.fullName}
              </p>
              <p>
                <span className="text-[25px] font-bold mb-2">Email Address:</span> {userData.email}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="Enter your card number"
                  className="w-full p-2 border rounded placeholder-text-[12px]"
                />
                {cardNumber && !cardNumberValid && (
                  <p className="text-red-500 text-sm mt-1">Card number must be 16 digits</p>
                )}
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded placeholder-text-[12px]"
                  />
                  {expiryDate && !expiryDateValid && (
                    <p className="text-red-500 text-sm mt-1">Enter valid date (MM/YY)</p>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block mb-1 font-medium">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full p-2 border rounded placeholder-text-[12px]"
                  />
                  {cvv && !cvvValid && <p className="text-red-500 text-sm mt-1">CVV must be 3-4 digits</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Log Out
              </button>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`flex-1 py-2 px-4 rounded ${
                  isFormValid()
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Pay Now
              </button>
            </div>
          </div>
          <div></div>
      </div>
      </>
    )
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-2 border rounded placeholder-text-[12px]"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full p-2 border rounded placeholder-text-[12px]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234567890123456"
              className="w-full p-2 border rounded placeholder-text-[12px]"
            />
            {cardNumber && !cardNumberValid && (
              <p className="text-red-500 text-sm mt-1">Card number must be 16 digits</p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="w-full p-2 border rounded placeholder-text-[12px]"
              />
              {expiryDate && !expiryDateValid && <p className="text-red-500 text-sm mt-1">Enter valid date (MM/YY)</p>}
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                className="w-full p-2 border rounded placeholder-text-[12px]"
              />
              {cvv && !cvvValid && <p className="text-red-500 text-sm mt-1">CVV must be 3-4 digits</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 px-4 rounded ${
              isFormValid()
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm
