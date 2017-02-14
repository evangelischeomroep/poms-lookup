const transformItem = (item) => {
  return {
    ...item,
    title: item.titles[0].value,
    date: item.sortDate
  }
}

export default transformItem
