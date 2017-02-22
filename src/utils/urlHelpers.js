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

export const getProfileFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search)

  return searchParams.get('profile')
}
