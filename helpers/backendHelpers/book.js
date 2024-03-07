import { getApiConfig, getAuthToken } from '../authHelper'
import { get, post, del } from '../apiHelper'
import * as url from '../urlHelper'
// import { getConfig } from '@testing-library/dom'

export const getBooks = (userType = '', page = 1, limit = 40, level) => {
  const isLoggedIn = getAuthToken() ? true : false
  if (userType === 'Student' || userType === 'Premium') {
    userType = 'Student'
  } else if (userType === 'Teacher' || userType === 'Freelance') {
    userType = 'Teacher'
  }
  return get(
    `${url.BOOK}?bk_mainCategory=${level}&isLoggedIn=${isLoggedIn}&userType=${userType}&page=${page}&limit=${limit}&search=`,
    getApiConfig(),
  )
}

export const getBook = (id, userId) => {
  const isLoggedIn = getAuthToken() ? true : false
  if (isLoggedIn) {
    return get(
      `${url.BOOK}/${id}?isLoggedIn=${isLoggedIn}&userId=${userId}`,
      getApiConfig(),
    )
  } else {
    return get(`${url.BOOK}/${id}?isLoggedIn=${isLoggedIn}&userId=${userId}`)
  }
}

export const getVideosByLevel = (
  level,
  userType = '',
  subject = '',
  search = '',
  controller,
) => {
  return get(
    `${url.BOOK}/getAllVideosByLevel?level=${level}&userType=${userType}&bk_subCategory=${subject}&search=${search}`,
    { ...getApiConfig(), signal: controller.signal },
  )
}

export const filterBooks = (
  level = 'JHS',
  category = '',
  subCategory = '',
  subject = [],
  isFree = '',
  resource = '',
  userType = '',
  isLoggedIn = false,
  page = 1,
  limit = 40,
  search = '',
) => {
  if (userType === 'Student' || userType === 'Premium') {
    userType = 'Student'
  } else if (userType === 'Teacher' || userType === 'Freelance') {
    userType = 'Teacher'
  }
  category = category.trim() === 'Select Main Category' ? '' : category
  subCategory = subCategory.trim() === 'Select Category' ? '' : subCategory
  // Sub Category contains Subject .... passed subject in sub category
  return get(
    `${url.BOOK}?bk_mainCategory=${level}&bk_category=${category}&bk_subCategory=${subject}&bk_subject=${subject}&bk_isFree=${isFree}&bk_resource=${resource}&userType=${userType}&isLoggedIn=${isLoggedIn}&page=${page}&limit=${limit}&search=${search}`,
    getApiConfig(),
  )
}

export const getSimilarBooks = (bookId) => {
  const isLoggedIn = getAuthToken() ? true : false
  return get(
    `${url.SIMILAR_BOOK}?isLoggedIn=${isLoggedIn}&bk_id=${bookId}`,
    getApiConfig(),
  )
}
export const filterBookByBookTitle = (
  category = '',
  subCategory = '',
  topic,
  subject = [],
  bookTitle = '',
  page = 1,
  limit = 40,
  userType = '',
) => {
  if (userType === 'Student' || userType === 'Premium') {
    userType = 'Student'
  } else if (userType === 'Teacher' || userType === 'Freelance') {
    userType = 'Teacher'
  }
  category = category.trim() === 'Class/Grade' ? '' : category
  subCategory = subCategory.trim() === 'Subject' ? '' : subCategory
  topic = topic.trim() === 'Topic' ? '' : topic
  bookTitle = bookTitle.trim() === '' ? '' : bookTitle

  return get(
    `${url.BOOK}?bk_category=${category}&bk_subCategory=${subCategory}&bk_topic=${topic}&bk_subject=${subject}&bk_title=${bookTitle}&page=${page}&limit=${limit}&userType=${userType}`,
    getApiConfig(),
  )
}

export const getMainCategories = () => {
  const isLoggedIn = getAuthToken() ? true : false
  if (isLoggedIn) {
    return get(`${url.BOOK_CATEGORY}/mainCategories`, getApiConfig())
  } else {
    return get(`${url.BOOK_CATEGORY}/mainCategories`)
  }
}

export const getCategories = () => {
  const isLoggedIn = getAuthToken() ? true : false
  if (isLoggedIn) {
    return get(`${url.BOOK_CATEGORY}/categories`, getApiConfig())
  } else {
    return get(`${url.BOOK_CATEGORY}/categories`)
  }
}

export const getSubCategories = () => {
  const isLoggedIn = getAuthToken() ? true : false
  if (isLoggedIn) {
    return get(`${url.BOOK_CATEGORY}/subCategories`, getApiConfig())
  } else {
    return get(`${url.BOOK_CATEGORY}/subCategories`)
  }
}

export const getBookSubjects = (filter_subject = 'JHS', userType = '') => {
  return get(
    `${url.BOOK_SUBJECTS}?subject=${filter_subject}&userType=${userType}`,
    getApiConfig(),
  )
}

export const getTopics = () => {
  return get(`${url.BOOK_CATEGORY}/topics`, getApiConfig())
}
export const getLibraryBooksStudent = () => {
  return get(`${url.BOOK}/library`, getApiConfig())
}

export const getLibraryBooksTeacher = () => {
  return get(`${url.BOOK}/teacher/library`, getApiConfig())
}

export const addToLibraryTeacher = (body) => {
  return post(`${url.BOOK}/teacher/library/add`, body, getApiConfig())
}

export const addToLibrary = (id) => {
  return post(`${url.BOOK}?bk_id=${id}`, {}, getApiConfig())
}

export const removeFromLibrary = (id, userType) => {
  if (userType === 'Student' || userType === 'Premium') {
    userType = 'Student'
  } else if (userType === 'Teacher' || userType === 'Freelance') {
    userType = 'Teacher'
  }
  return del(`${url.BOOK}?bk_id=${id}&userType=${userType}`, getApiConfig())
}

// Videos
export const getVideoSubjects = (filter_subject = 'JHS', userType = '') => {
  return get(
    `${url.BOOK}/getVideoSubjects?mainCategory=${filter_subject}&userType=${userType}`,
    getApiConfig(),
  )
}

export const getAllContentCategories = () => {
  return get(`${url.BOOK_CATEGORY}/all`, getApiConfig())
}
