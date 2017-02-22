const transformItem = (item) => {
  return {
    mid: item.mid,
    title: item.titles[0].value,
    date: new Date(item.sortDate).toLocaleDateString(),
    type: item.type,
    avType: item.avType
  }
}

export default transformItem
