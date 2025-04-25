"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
const PaymentForm = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [cardNumberValid, setCardNumberValid] = useState(false)
  const [expiryDateValid, setExpiryDateValid] = useState(false)
  const [cvvValid, setCvvValid] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const storedData = localStorage.getItem("userLoginDetails")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)
      setFullName(parsedData.fullName)
      setEmail(parsedData.email)
      setIsLoggedIn(true)
    }
  }, [])

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 16) {
      setCardNumber(value)
      setCardNumberValid(value.length === 16)
    }
  }

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      if (value.length > 2) {
        setExpiryDate(value.slice(0, 2) + "/" + value.slice(2))
      } else {
        setExpiryDate(value)
      }
      let isValidMonth = false
      let isValidYear = false
      
      if (value.length >= 2) {
        const month = parseInt(value.slice(0, 2), 10)
        isValidMonth = month >= 1 && month <= 12
      }
      
      if (value.length === 4) {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100 
        const currentMonth = currentDate.getMonth() + 1 
        
        const inputYear = parseInt(value.slice(2, 4), 10)
        const inputMonth = parseInt(value.slice(0, 2), 10)
        
        if (inputYear > currentYear) {
          isValidYear = true
        } 
        else if (inputYear === currentYear && inputMonth >= currentMonth) {
          isValidYear = true
        }
      }
      
      setExpiryDateValid(isValidMonth && isValidYear && value.length === 4)
    }
  }

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
      setCvvValid(value.length >= 3 && value.length <= 4)
    }
  }

  const isFormValid = () => {
    return cardNumberValid && expiryDateValid && cvvValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      const paymentData = {
        fullName,
        email,
        cardNumber: cardNumber.replace(/\d(?=\d{4})/g, "*"),
        expiryDate,
      }
      localStorage.setItem("userPaymentDetails", JSON.stringify(paymentData))

      router.push("/success")

      setUserData(paymentData)
    } else {
      alert("Please fill all fields correctly")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userLoginDetails")
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
      <div className="w-full flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome, {userData.fullName}!</h1>
            <p className="text-gray-600">{userData.email}</p>
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
            <button onClick={handleLogout} className="flex-1 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
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
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Please Log In First</h1>
        <p className="mb-6">You need to log in before accessing the payment page.</p>
        <a href="/" className="inline-block py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Login
        </a>
      </div>
    </div>
  )
}

export default PaymentForm
