export const getToken = () => typeof window !== "undefined" ? localStorage.getItem("token") : null

export const setToken = (token) => 
typeof window !== "undefined" ? localStorage.setItem("token", `User ${token}`) : null
