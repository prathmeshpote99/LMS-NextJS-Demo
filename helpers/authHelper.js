import swal from 'sweetalert'
import CryptoJS from 'crypto-js'

export const LoginAlert = async (nav) => {
  const value = await swal('Please do login into your account', {
    buttons: {
      defeat: 'Log in',
      cancel: 'Cancel',
    },
  })
  switch (value) {
    case 'defeat':
      nav('/auth/signin')
      break
    default:
  }
}

export const getAuthToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem('authToken') : null
}

export const setAuthToken = (token) => {
  if (!token) {
    return false
  }
  typeof window !== "undefined" ? localStorage.setItem('authToken', token) : null
  return true
}

export const removeAuthInfo = () => {
  typeof window !== "undefined" ? localStorage.removeItem('authToken') : null
  typeof window !== "undefined" ? localStorage.removeItem('userInfo') : null
  typeof window !== "undefined" ? localStorage.removeItem('profilePic') : null
  typeof window !== "undefined" ? localStorage.removeItem('fullUserInfo') : null
  return true
}

export const getUserInfo = () => {
  let userInfo = typeof window !== "undefined" ? localStorage.getItem('userInfo') : null
  return userInfo ? JSON.parse(userInfo) : null
}

export const setUserInfo = (userInfo) => {
  if (!userInfo) {
    return false
  }

  userInfo = JSON.stringify(userInfo)
  typeof window !== "undefined" ? localStorage.setItem('userInfo', userInfo) : null
  return true
}

export const setFullUserInfo = (fullUserInfo) => {
  if (!fullUserInfo) {
    return false
  }

  fullUserInfo = JSON.stringify(fullUserInfo)
  typeof window !== "undefined" ? localStorage.setItem('fullUserInfo', fullUserInfo) : null
  return true
}

export const getFullUserInfo = () => {
  let fullUserInfo = typeof window !== "undefined" ? localStorage.getItem('fullUserInfo') : null
  return fullUserInfo ? JSON.parse(fullUserInfo) : null
}

export const removeUserInfo = () => {
  typeof window !== "undefined" ? localStorage.removeItem('userInfo') : null
  return true
}

export const getApiConfig = (isFormData) => {
  let config = {}
  let token = getAuthToken()

  if (token) {
    let headers = {}
    if (isFormData) {
      headers = {
        'Content-Type': `multipart/form-data`,
        authorization: token,
      }
    } else {
      headers = {
        authorization: token,
      }
    }

    config = {
      ...config,
      headers,
    }
  }
  return config
}

export const basicAuthOfEnableX = {
  auth: {
    username: '63a16cb960543226db0078c4',
    password: '6equryQaAuruTa5uEageReRueyBe7agyqena',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

export const encryptId = (number) => {
  const encrypted = CryptoJS.AES.encrypt(
    number.toString(),
    process.env.REACT_APP_UPLOAD_SECRET_KEY,
  ).toString()
  const encoded = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encrypted),
  )
  return encoded
}

export const decryptId = (encodedNumber) => {
  try {
    const decoded = CryptoJS.enc.Base64.parse(encodedNumber).toString(
      CryptoJS.enc.Utf8,
    )
    const decryptedBytes = CryptoJS.AES.decrypt(
      decoded,
      process.env.REACT_APP_UPLOAD_SECRET_KEY,
    )
    const decryptedNumber = decryptedBytes.toString(CryptoJS.enc.Utf8)
    return parseInt(decryptedNumber, 10)
  } catch (error) {
    return null
  }
}

export const checkIdWithEncryption = (id, setDecryptedId, navigate) => {
  try {
    const decryptedId = decryptId(id)
    setDecryptedId(decryptedId)
    if (decryptedId) {
      return decryptedId
    } else {
      navigate('/not-found')
    }
  } catch (e) {}
}
