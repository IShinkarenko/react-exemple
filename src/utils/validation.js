export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^ \w])/
export const USER_NAME_REGEX = /^([a-zA-Z0-9.]){1,65}$/
export const PHONE_REGEX = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
export const NUMBER_REGEX = /^[0-9]*$/
export const getNumberRegex = (decimal) => new RegExp('^\\s*(?=.*[0-9])\\d*(?:\\.\\d{1,' + decimal + '})?\\s*$')
