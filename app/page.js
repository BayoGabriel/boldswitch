"use client"

import { useState, useEffect } from "react"
import  { useRouter } from "next/navigation"
const LoginForm = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const router = useRouter() 
 

  const isFormValid = () => {
    return fullName && email
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      const userData = { fullName, email }
      localStorage.setItem("userLoginDetails", JSON.stringify(userData))
      router.push("/payment")
      setUserData(userData)
      setIsLoggedIn(true)
    } else {
      alert("Please fill all fields")
    }
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

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 px-4 rounded ${
              isFormValid()
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Login Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
