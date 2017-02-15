const getFiltersFromUrl = () => {
  const searchParams = new window.URLSearchParams(window.location.search)

  return ['types', 'broadcasters'].reduce((filters, current) => {
    if (searchParams.getAll(current)) {
      filters[current] = searchParams.getAll(current)
    }

    return filters
  }, {})
}

export default getFiltersFromUrl
