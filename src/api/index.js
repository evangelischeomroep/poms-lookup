import axios from 'axios'

import npoApiInterceptor from './npoApiInterceptor'
import transformItem from './transformItem'

// Configure Axios to use the NPO API Request Interceptor
axios.interceptors.request.use(npoApiInterceptor({
  key: process.env.REACT_APP_NPO_API_KEY,
  secret: process.env.REACT_APP_NPO_API_SECRET
}))

const API_URL = 'https://rs.poms.omroep.nl/v1/api'

const api = {
  media: ({ text }) =>
    axios({
      url: '/media',
      baseURL: API_URL,
      method: 'post',
      params: {
        properties: 'none',
        max: 240
      },
      data: {
        searches: {
          text: text
        },
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

export default api
