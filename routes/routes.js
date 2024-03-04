import PropTypes from 'prop-types'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header'
import { getAuthToken } from '../helpers/authHelper'
const Authmiddleware = ({
  component: Component,
  isAuthProtected,
  layout: Layout,
  isLayout,
  ...rest
}) => {
  if (isAuthProtected && !getAuthToken()) {
    return <Navigate to={{ pathname: '/auth/signin' }} />
  } else {
    if (isLayout) {
      return (
        <>
          {/* <Header /> */}
          <Layout {...rest}>
            <Component />
          </Layout>
        </>
      )
    } else {
      return (
        <>
          <Component />
        </>
      )
    }
  }
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
  isLayout: PropTypes.any,
}

export default Authmiddleware
