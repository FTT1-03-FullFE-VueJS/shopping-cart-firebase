export const parseFormData = (form) => {
  return Object.fromEntries(new FormData(form).entries());
}