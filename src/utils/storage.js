// 本地存储
// 添加数据
export const setItem = (key, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.localStorage.setItem(key, data)
}
// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
