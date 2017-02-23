import axios from 'axios'

import npoApiInterceptor from 'npo-api-interceptor'
import transformItem from './transformItem'
import { getProfileFromUrl } from '../utils/urlHelpers'

// Configure Axios to use the NPO API Request Interceptor
axios.interceptors.request.use(npoApiInterceptor({
  key: process.env.REACT_APP_NPO_API_KEY,
  secret: process.env.REACT_APP_NPO_API_SECRET
}))

const API_URL = 'https://rs.poms.omroep.nl/v1/api'

/**
 * Creats a matcher for multiple values
 *
 * @param   {Array}  values
 * @returns {Object}
 */
const createMultipleValueMatcher = (values) => ({
  match: 'MUST',
  value: values.map(v => ({
    value: v,
    match: 'SHOULD'
  }))
})

/**
 * Formats the Search Query to be passed to the NPO API
 *
 * @param   {Object} query
 * @returns {Object}
 */
const formatSearchQuery = ({ text, types = [], broadcasters = [] }) => {
  let searches = {
    text: text
  }

  if (types.length) {
    searches.types = createMultipleValueMatcher(types)
  }

  if (broadcasters.length) {
    searches.broadcasters = createMultipleValueMatcher(broadcasters)
  }

  return searches
}

const api = {
  media: ({ text, types = [], broadcasters = [] }) => {
    const profile = getProfileFromUrl()

    const params = {
      properties: 'none',
      max: 240
    }

    if (profile) {
      params.profile = profile
    }

    return axios({
      url: '/media',
      baseURL: API_URL,
      method: 'post',
      params: params,
      data: {
        searches: formatSearchQuery({ text, types, broadcasters }),
        sort: {
          sortDate: 'DESC'
        }
      }
    })
    .then(res => {
      if (!res.data || !res.data.items) {
        throw new Error(`No items found`)
      }

      return res.data.items.map((item) => transformItem(item.result))
    })
  }
}

export default api
