export const parseFormData = (form) => {
  return Object.fromEntries(new FormData(form).entries());
}

export const getURLParam = (key) => {
  const href    = location.href;
  const url     = new URL(href);
  return url.searchParams.get(key);
}