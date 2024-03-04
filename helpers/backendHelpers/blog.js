import { get, post, del, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllBlog = (creatorType) => {
  return get(
    `${url.BLOG}/getAll?bl_creation_type=${creatorType}`,
    getApiConfig(),
  )
}

export const getAllBlogWithPagination = (creatorType, page = 1, limit = 10) => {
  return get(
    `${url.BLOG}/pagination?page=${page}&limit=${limit}&bl_creation_type=${creatorType}`,
    getApiConfig(),
  )
}

export const getBlogById = (id) => {
  return get(`${url.BLOG}/${id}`, getApiConfig())
}

//Blog Image update
export const createBlogAPI = async (data) => {
  return post(
    `${url.DASHBOARD_API_URL}/blog?from=studentApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}
export const updateBlog = (id, body) => {
  return put(`${url.BLOG}/${id}`, body, getApiConfig())
}

export const deleteBlog = (id) => {
  return del(`${url.BLOG}/${id}`, getApiConfig())
}

export const likeBlogAPI = (id) => {
  return post(`${url.BLOG}/likeBlog?bl_id=${id}`, getApiConfig(true))
}
// Blog Comments
// Create Comment
export const createComment = async (data) => {
  return post(`${url.BLOGCOMMENT}`, data, getApiConfig(true))
}
// Blog Comments By Blog Id
export const getCommentsByBlogId = (id) => {
  return get(
    `${url.BLOGCOMMENT}/getCommentByBlogId/get?bl_id=${id}`,
    getApiConfig(),
  )
}
