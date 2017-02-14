const transformItem = (item) => {
  return {
    ...item,
    title: item.titles[0].value,
    date: new Date(item.sortDate).toLocaleDateString()
  }
}

export default transformItem
