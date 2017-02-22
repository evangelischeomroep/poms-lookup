/* eslint-env jest */

export const MOCK_RESULTS = [
  { mid: 'POMS_EO_7337515', title: 'Vlog: prinses Beatrix bezoekt Madurodam', date: 1486577234482, type: 'CLIP', avType: 'VIDEO' },
  { mid: 'POMS_EO_7167107', title: 'Vlog: Achter de schermen bij de opening van Thialf', date: 1485589331114, type: 'CLIP', avType: 'VIDEO' },
  { mid: 'POMS_EO_7001692', title: 'Vlog Joël Voordewind uit Israël', date: 1484749688641, type: 'CLIP', avType: 'VIDEO' },
  { mid: 'POMS_EO_5284895', title: 'Zapp Your Planet Vlog - Rondleiding kamp', date: 1475146440000, type: 'CLIP', avType: 'VIDEO' }
]

const apiMock = {
  media: ({ text, types = [], broadcasters = [] }) => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (text === 'succeed') {
          resolve(MOCK_RESULTS)
        } else {
          reject(new Error('Something went wrong'))
        }
      })
    })
  }
}

export default apiMock
