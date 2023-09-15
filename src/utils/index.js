/* eslint-disable no-unused-vars */
import { ANALYTICS, CHANNELS, PRIVATE_NETWORK_ONLY, PUBLIC_NETWORK } from 'constant'
import _, { omit } from 'lodash'
import { isEmpty } from 'lodash-es'
import move from 'lodash-move'
import { nanoid } from 'nanoid'
import getConfig from 'next/config'

export const capitalizeFirstLetters = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

export const getPreferenceId = (data, preferenceType) => {
  const preference = data?.getUser?.preferences.find((company) => company.preferenceType === preferenceType)

  return preference?.value
}

export const getRestrictedMenuItems = (subscriptionLevel) => {
  const items = {
    ExpandigoBasic: [ANALYTICS, CHANNELS],
  }
  return items[subscriptionLevel]
}

export const fetchJson = async function (url) {
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const fetchMarkdown = async function (url) {
  const response = await fetch(url)
  const markdown = await response.text()
  return markdown
}

export const moveAndUpdateIndexOrder = (array, result) => {
  const reorderedArray = _.cloneDeep(move(array, result.source.index, result.destination.index))
  let orderIndex = -1

  _.each(reorderedArray, (item) => {
    orderIndex += 1
    item.orderIndex = orderIndex
  })

  return reorderedArray
}

export const getTagsByType = (tags, tagType) => (tags || []).filter((tag) => tag.tagType === tagType)

export const concatTags = (existTags, newTags, type) =>
  (existTags || [])
    .filter((tag) => tag.tagType !== type)
    .map(({ __typename, ...rest }) => rest)
    .concat(newTags.map((option) => ({ tagType: type, value: option.value, label: option.label }))) //key: option.key ???

export const getDefinitionsByType = (definitions, definitionType) =>
  (definitions || [])
    .filter((definition) => definition.definitionType === definitionType)
    .map((item) => ({ ...item, label: item.name, value: item.id }))

export const renderValueFromOptions = (options, currentValue) =>
  (options || []).filter((option) => (currentValue || []).map((option) => option).includes(option.value))

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const getCountry = (locale) => {
  const l = locale.split('-')

  return l.length > 0 ? l[1] : undefined
}

export const getOptionLabel = (searchableValue, options) => {
  const option = options.find(({ value }) => value === searchableValue)

  return option.label
}

export const extractIds = (values) => values.map(({ id }) => id)

export const getDefinitionsById = (definitions = [], definitionType = []) =>
  definitions.filter(({ id }) => definitionType.includes(id))
// .map((item) => ({ ...item, label: item.name, value: item.id }))

export const normalizeData = (arr) => arr.map(({ __typename, ...rest }) => rest)

export const generateIdValuePair = (arr) =>
  arr.map(({ __typename, id }) => ({ definitionId: id, id: nanoid(), value: '' }))

export const getLogoUploadUrl = ({ companyId, userId, isBanner }) => {
  const { publicRuntimeConfig } = getConfig()
  const baseUrl = publicRuntimeConfig.expandigo_global

  const renderURL = () => {
    if (companyId) {
      if (isBanner) {
        return `${baseUrl}/upload?type=Company&id=${companyId}&asset=banner`
      } else {
        return `${baseUrl}/upload?type=Company&id=${companyId}&asset=logo`
      }
    } else {
      return `${baseUrl}/upload?type=User&id=${userId}&asset=avatar`
    }
  }

  return renderURL()
}

export const getCsvUploadUrl = (companyId) => {
  const { publicRuntimeConfig } = getConfig()
  const baseUrl = publicRuntimeConfig.expandigo_global

  const renderURL = () => {
    return `${baseUrl}/upload?type=Company&id=${companyId}&asset=json`
  }

  return renderURL()
}

export const generateTabs = (arr) => arr.map(({ name }) => ({ title: name }))

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const omitTypenameInArr = (arr) => arr.map((item) => omit(item, '__typename'))

export const formatNumber = (num = '') => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

export const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn'
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M'
  } else {
    return Math.round(num / 100) / 10 + 'K'
  }
}

export const splitLocation = (location) => {
  const country = location.country && location.country.name
  const region = location.region && `, ${location.region.name}`
  const city = location.city && `, ${location.city.name}`

  return (
    <>
      {country}
      {region}
      {city}
    </>
  )
}

export const checkRequiredTypes = (requiredTypes, tags) =>
  requiredTypes.filter((tagType) => isEmpty(getTagsByType(tags, tagType)))

export const appendProtocol = (url) => {
  if (url && !url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://'))
    return `https://${url}`
  else return url
}

export const isURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}
