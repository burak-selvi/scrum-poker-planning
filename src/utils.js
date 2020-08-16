export const getDeveloperLink = () => {
  return localStorage.getItem('link');;
}

export const getMasterId = () => {
  return localStorage.getItem('master');
}

export const removeStorages = () => {
  localStorage.removeItem('link');
  localStorage.removeItem('master');
}