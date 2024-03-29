import React, { useContext, createContext, Component, useState } from 'react'
export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
  const userInfo = typeof window !== 'undefined' ? localStorage.getItem("userInfo") : null;
  const [temp, setTemp] = useState(true)
  const [url, setUrl] = useState('')
  const setLogin = () => {
    setAuthenticated(true)
  }
  const setLogout = () => {
    typeof window !== "undefined" ? localStorage.removeItem('authToken') : null
    setAuthenticated(false)
    setTemp(!temp)
  }
  const setPathUrl = (urlName) => {
    setUrl(urlName)
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setLogin,
        setLogout,
        isLoggedIn,
        userInfo,
        setPathUrl,
        setPathUrl,
        url,
        loading,
        setLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
export function useLoading() {
  return useContext(AuthContext);
}


