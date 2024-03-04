import { get, post } from '../apiHelper'
import { getApiConfig } from '../authHelper'
import * as url from '../urlHelper'

export const getBookReviews = (id) => {
  return get(`${url.BOOKREVIEW}?br_bookId=${id}`, getApiConfig())
}

export const getBookReview = (id) => {
  return get(`${url.BOOKREVIEW}/${id}`, getApiConfig())
}

export const createBookReview = (data) => {
  return post(url.BOOKREVIEW, data, getApiConfig())
}
