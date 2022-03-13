export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
export const getItem = key => {
  const items = window.localStorage.getItem(key)
  try {
    return JSON.parse(items)
  } catch (err) {
    return items
  }
}
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
