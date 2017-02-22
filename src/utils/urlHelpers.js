import URLSearchParamsPolyfill from 'url-search-params'

const URLSearchParams = window.URLSearchParams || URLSearchParamsPolyfill

export const getFiltersFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search)

  return ['types', 'broadcasters'].reduce((filters, current) => {
    if (searchParams.getAll(current)) {
      filters[current] = searchParams.getAll(current)
    }

    return filters
  }, {})
}

const getPropertyFromUrl = (property) => () => {
  const searchParams = new URLSearchParams(window.location.search)

  return searchParams.get(property)
}

export const getProfileFromUrl = getPropertyFromUrl('profile')

export const getLimitFromUrl = () => {
  const limit = getPropertyFromUrl('limit')()

  if (limit) {
    return parseInt(limit, 10)
  }
}
